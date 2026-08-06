import { getServerSession } from "@/server/auth/auth-session";
import type { LayoutProps } from "@/types";
import { redirect } from "next/navigation";

export default async function VerifyLayout({ children }: LayoutProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.emailVerified) {
    redirect("/");
  }

  return <>{children}</>;
}
