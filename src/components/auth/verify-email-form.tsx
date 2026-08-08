"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { useOtpCountdown } from "../hooks/use-otp-countdown";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type VerifyEmailFormProps = { email: string };

export const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const t = useTranslations("AuthForm");

  const { remaining, restart } = useOtpCountdown(300);
  const isExpired = remaining === 0;

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

  const handleResend = async () => {
    await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    restart(300);
  };

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
      <p
        className={cn(
          "font text-9xl font-thin tracking-tighter",
          !remaining && "text-5xl"
        )}
      >
        {remaining
          ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
          : t("code_expired")}
      </p>
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
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={formState.isSubmitting || isExpired}>
          {t("verify")}
        </Button>
        <Button type="button" onClick={handleResend} disabled={!isExpired}>
          {t("resend")}
        </Button>
      </form>
    </>
  );
};
