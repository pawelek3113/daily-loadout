import { AuthPageComponent } from "@/components/auth/auth-page";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password?",
};

const ForgotPasswordPage = () => {
  return <AuthPageComponent form={<ForgotPasswordForm />} />;
};

export default ForgotPasswordPage;
