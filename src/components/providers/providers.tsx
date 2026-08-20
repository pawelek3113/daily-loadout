import { Toaster } from "@/components/ui/toast";
import { TRPCReactProvider } from "@/trpc/client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ToastListener } from "../shared/toast-listener";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NextIntlClientProvider>
        <Toaster />
        {children}
        <ToastListener />
      </NextIntlClientProvider>
    </TRPCReactProvider>
  );
};
