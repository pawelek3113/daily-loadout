"use client";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        const d = await authClient.signOut();
        if (d.data?.success) {
          toast("signed out!");
        }
      }}
    >
      Sign out
    </Button>
  );
};
