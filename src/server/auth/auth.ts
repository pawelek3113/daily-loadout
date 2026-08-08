import { Locale } from "@/i18n/locales";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { sendVerificationOTPMail } from "@/server/mail/mails";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { waitUntil } from "@vercel/functions";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { getLocale, getTranslations } from "next-intl/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        const locale = (await getLocale()) as Locale;
        const t = await getTranslations();
        const title = t("emails.email_verification.title");

        if (type === "email-verification") {
          waitUntil(sendVerificationOTPMail(email, otp, title, locale));
        }
      },
    }),
  ],
});
