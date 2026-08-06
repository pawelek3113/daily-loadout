import { Locale } from "@/i18n/locales";
import { sendMail } from "./send";
import VerificationOtpEmail from "./templates/verification";

export const sendVerificationOTPMail = async (
  to: string,
  otp: string,
  title: string,
  locale?: Locale
) => {
  sendMail({
    from: "DailyLoadout Verifications <verify@pawelkomendera.me>",
    to,
    subject: title,
    react: VerificationOtpEmail({ otp, locale: locale ?? "en" }),
  });
};
