import { AuthPageComponent } from "@/components/auth/auth-page";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { buildToastRedirectUrl } from "@/lib/toast-messages";
import { TOAST_TYPES } from "@/lib/toast-variants";
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
    redirect(
      buildToastRedirectUrl(
        "/",
        TOAST_TYPES.error,
        "reset_password.token_not_provided"
      )
    );
  }

  return <AuthPageComponent form={<ResetPasswordForm token={token} />} />;
};

export default ResetPasswordPage;
