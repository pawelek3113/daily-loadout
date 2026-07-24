import { TRPCReactProvider } from "@/trpc/client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </TRPCReactProvider>
  );
};
