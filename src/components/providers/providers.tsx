import { TRPCReactProvider } from "@/trpc/client";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        // disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
