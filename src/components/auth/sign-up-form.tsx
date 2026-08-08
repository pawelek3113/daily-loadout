"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { setOtpExpiry } from "@/lib/otp-timer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import z from "zod";

export const SignUpForm = () => {
  const t = useTranslations("AuthForm");

  const router = useRouter();

  const formSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .nonempty(t("errors.name.nonempty"))
          .min(2, t("errors.name.min"))
          .max(32, t("errors.name.max")),
        email: z.email({ error: t("errors.email") }),
        password: z
          .string()
          .nonempty(t("errors.password.nonempty"))
          .min(8, t("errors.password.min")),
      }),
    [t]
  );

  type SignUpFormData = z.infer<typeof formSchema>;

  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async ({ name, email, password }: SignUpFormData) => {
    const { error } = await authClient.signUp.email({
      email,
      name,
      password,
    });

    if (error) {
      if (error?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        setError(
          "email",
          {
            message: t("errors.account_exists"),
          },
          { shouldFocus: true }
        );
      }
      if (
        error?.code &&
        error?.code !== "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        setError("email", { type: "value" });
        setError(
          "password",
          {
            message: t("errors.general", { code: error?.code ?? error.status }),
          },
          { shouldFocus: true }
        );
      }
      return;
    }

    setOtpExpiry(300);
    router.push("/verify");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t("name")}</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="AmazingJoe"

                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        <Button type="submit">{t("signup")}</Button>
        {/* TODO: maybe put that on page instead here */}
        <p className="text-muted-foreground text-xs font-medium">
          {t.rich("account_exists", {
            link: (chunks) => (
              <Link href="/sign-in" className="text-hyperlink">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </form>
    </>
  );
};
