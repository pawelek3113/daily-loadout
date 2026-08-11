import "server-only";
import { storeTestOTP, storeTestResetUrl } from "../test-store";
import type { Mailer } from "./mailer";

export const testMailer: Mailer = {
  sendVerificationOTPMail: async (props) => {
    storeTestOTP(props.email, props.otp);
  },
  sendResetPasswordMail: async (props) => {
    storeTestResetUrl(props.email, props.url);
  },
};
