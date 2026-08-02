import { SignUpForm } from "@/components/auth/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
