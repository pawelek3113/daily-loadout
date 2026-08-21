import { SignInPageComponent } from "@/components/auth/sign-in-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = () => {
  return <SignInPageComponent />;
};

export default SignInPage;
