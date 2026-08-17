"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import z from "zod";
import { ParagraphLink } from "../shared/para-with-link";
import { Button } from "../ui/button";

export const SignInForm = () => {
  const t = useTranslations("AuthForm");
  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email({ error: t("errors.email") }),
        password: z
          .string()
          .nonempty(t("errors.password.nonempty"))
          .min(8, t("errors.password.min")),
      }),
    [t]
  );

  type SignInFormData = z.infer<typeof formSchema>;
  const { control, handleSubmit, setError, formState } =
    useForm<SignInFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onTouched",
    });

  const router = useRouter();

  const onSubmit = async ({ email, password }: SignInFormData) => {
    const { data, error } = await authClient.signIn.email({ email, password });

    if (data?.user) {
      router.push("/");
    }

    if (error?.code === "INVALID_EMAIL_OR_PASSWORD") {
      setError("email", { type: "value" });
      setError("password", {
        type: "value",
        message: t("errors.invalid_email_or_pswd"),
      });
    }
    if (error?.code && error?.code !== "INVALID_EMAIL_OR_PASSWORD") {
      setError("email", { type: "value" });
      setError(
        "password",
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
                aria-invalid={fieldState.invalid}
                placeholder="joe@acme.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <ParagraphLink
          translationKey="AuthForm.forgot_pswd"
          href="/forgot-password"
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("login")}
        </Button>
        <ParagraphLink translationKey="AuthForm.no_account" href="/sign-up" />
      </form>
    </>
  );
};
