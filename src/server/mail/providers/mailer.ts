import { sendVerificationOTPMail } from "../mails";
import { testMailer } from "./testMailer";

export interface Mailer {
  sendVerificationOTPMail: typeof sendVerificationOTPMail;
}

export const getMailer = async (): Promise<Mailer> => {
  if (process.env.E2E_TESTS === "1") return testMailer;

  const { resendMailer } = await import("./resendMailer");
  return resendMailer;
};
