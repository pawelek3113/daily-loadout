import { AuthPageComponent } from "@/components/auth/auth-page";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = () => {
  return <AuthPageComponent form={<SignInForm />} />;
};

export default SignInPage;
