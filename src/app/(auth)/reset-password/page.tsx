import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forgot password?",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

const ResetPasswordPage = async (props: ResetPasswordPageProps) => {
  const { token = null } = await props.searchParams;

  if (!token) {
    redirect("/?error=password-token-not-provided");
  }

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
