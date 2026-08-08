import "server-only";
import type { Mailer } from "./mailer";
import { sendVerificationOTPMail } from "../mails";

export const resendMailer: Mailer = {
  sendVerificationOTPMail,
};
