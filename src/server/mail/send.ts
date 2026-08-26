import { CreateEmailOptions } from "resend";
import resend from "./client";

export const sendMail = async (args: CreateEmailOptions) => {
  const { data, error } = await resend.emails.send(args);

  if (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email send failed");
  }

  return data;
};
