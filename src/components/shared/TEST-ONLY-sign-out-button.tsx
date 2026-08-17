"use client";
import { authClient } from "@/lib/auth-client";
import { showToast } from "@/lib/toasts";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        const d = await authClient.signOut();
        if (d.data?.success) {
          showToast({ title: "Signed out" });
        }
      }}
    >
      Sign out
    </Button>
  );
};
