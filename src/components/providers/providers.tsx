import { Toaster } from "@/components/ui/toast";
import { TRPCReactProvider } from "@/trpc/client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ServerToastListener } from "../shared/server-toast-listener";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NextIntlClientProvider>
        <Toaster />
        {children}
        <ServerToastListener />
      </NextIntlClientProvider>
    </TRPCReactProvider>
  );
};
