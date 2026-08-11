"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";
import { Button } from "../ui/button";

export const ForgotPasswordForm = () => {
  const t = useTranslations("AuthForm");
  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email({ error: t("errors.email") }),
      }),
    [t]
  );

  type ForgotPasswordFormData = z.infer<typeof formSchema>;
  const { control, handleSubmit, setError, formState } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
      mode: "onTouched",
    });

  const onSubmit = async ({ email }: ForgotPasswordFormData) => {
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    // TODO: toast or something

    if (error?.code) {
      setError(
        "email",
        {
          message: t("errors.general", { code: error?.code ?? error.status }),
        },
        { shouldFocus: true }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="joe@acme.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("reset_password")}
        </Button>
      </form>
    </>
  );
};
