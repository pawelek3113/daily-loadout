import { Toaster } from "@/components/ui/toast";
import { TRPCReactProvider } from "@/trpc/client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ErrorToastListener } from "../shared/error-toast-listener";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NextIntlClientProvider>
        <Toaster />
        {children}
        <ErrorToastListener />
      </NextIntlClientProvider>
    </TRPCReactProvider>
  );
};
