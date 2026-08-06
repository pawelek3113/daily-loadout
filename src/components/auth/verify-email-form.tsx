"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

type VerifyEmailFormProps = { email: string };

export const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const t = useTranslations("AuthForm");

  const router = useRouter();

  const formSchema = useMemo(
    () =>
      z.object({
        otp: z.stringFormat("otp", /^[0-9]{6}$/, { error: t("errors.otp") }),
      }),
    [t]
  );
  type VerifyEmailFormData = z.infer<typeof formSchema>;

  const { control, handleSubmit, setError, formState } =
    useForm<VerifyEmailFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        otp: "",
      },
    });

  const onSubmit = async ({ otp }: VerifyEmailFormData) => {
    const { data, error } = await authClient.emailOtp.verifyEmail({
      otp,
      email,
    });

    if (data?.status) {
      toast("success");
      router.push("/");
    }
    if (error?.code) {
      setError(
        "otp",
        {
          message: t("errors.general", { code: error?.code ?? error.status }),
        },
        { shouldFocus: true }
      );
    }
  };

  return (
    <>
      {/* 5 minute timer */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="otp">{t("otp")}</FieldLabel>
              <InputOTP {...field} id="otp" maxLength={6} required>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("verify")}
        </Button>
        {/* TODO: resend token button, maybe on page instead of here */}
      </form>
    </>
  );
};
