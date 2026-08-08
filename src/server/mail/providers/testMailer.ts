import "server-only";
import { storeTestOTP } from "../test-store";
import type { Mailer } from "./mailer";

export const testMailer: Mailer = {
  sendVerificationOTPMail: async (props) => {
    storeTestOTP(props.email, props.otp);
  },
};
