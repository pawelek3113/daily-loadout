import { getTestOTP } from "@/server/mail/test-store";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (process.env.E2E_TESTS !== "1") {
    notFound();
  }

  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "email query param required" },
      { status: 400 }
    );
  }

  const data = getTestOTP(email);

  return NextResponse.json({ otp: data?.otp ?? null });
}
