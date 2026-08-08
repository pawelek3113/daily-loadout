import { Locale } from "@/i18n/locales";
import { sendMail } from "./send";
import VerificationOtpEmail from "./templates/verification";

type sendVerificationOTPMailProps = {
  email: string;
  otp: string;
  title: string;
  locale?: Locale;
};

export const sendVerificationOTPMail = async ({
  email,
  otp,
  title,
  locale,
}: sendVerificationOTPMailProps) => {
  sendMail({
    from: "DailyLoadout Verifications <verify@pawelkomendera.me>",
    to: email,
    subject: title,
    react: VerificationOtpEmail({ otp, locale: locale ?? "en" }),
  });
};
