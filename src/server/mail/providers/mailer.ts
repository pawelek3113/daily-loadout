import type { sendResetPasswordMail, sendVerificationOTPMail } from "../mails";
import { testMailer } from "./testMailer";

export interface Mailer {
  sendVerificationOTPMail: typeof sendVerificationOTPMail;
  sendResetPasswordMail: typeof sendResetPasswordMail;
}

export const getMailer = async (): Promise<Mailer> => {
  if (process.env.E2E_TESTS === "1") return testMailer;

  const { resendMailer } = await import("./resendMailer");
  return resendMailer;
};
