"use client";

import { useTRPC } from "@/trpc/client";
// <-- hooks can only be used in client components
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

export function ClientGreeting() {
  const trpc = useTRPC();
  const locale = useLocale();

  const t = useTranslations();

  const greeting = useQuery(trpc.hello.queryOptions({ text: "world", locale }));
  if (!greeting.data) return <div>{t("HomePage.loading")}...</div>;
  return <div>{greeting.data.greeting}</div>;
}
