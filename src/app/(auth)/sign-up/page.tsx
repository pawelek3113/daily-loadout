import { AuthPageComponent } from "@/components/auth/auth-page";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUpPage = () => {
  return <AuthPageComponent form={<SignUpForm />} />;
};

export default SignUpPage;
