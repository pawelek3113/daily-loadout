import { getServerSession } from "@/server/auth/auth-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // const session = await auth.api.getSession({ headers: await headers() });
  const session = await getServerSession();
  if (session) {
    return redirect("/");
  }
  return <>{children}</>;
}
