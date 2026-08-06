import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { getServerSession } from "@/server/auth/auth-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify",
};

const VerifyPage = async () => {
  const session = await getServerSession();
  return <VerifyEmailForm email={session!.user.email} />;
};

export default VerifyPage;
