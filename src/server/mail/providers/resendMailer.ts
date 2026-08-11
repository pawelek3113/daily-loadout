import "server-only";
import { sendResetPasswordMail, sendVerificationOTPMail } from "../mails";
import type { Mailer } from "./mailer";

export const resendMailer: Mailer = {
  sendVerificationOTPMail,
  sendResetPasswordMail,
};
