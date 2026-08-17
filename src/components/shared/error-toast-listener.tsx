"use client";

import { TOAST_TYPES } from "@/lib/toast-variants";
import { showToast } from "@/lib/toasts";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ERROR_MESSAGES: Record<
  string,
  { titleKey: string; descriptionKey: string }
> = {
  "password-token-not-provided": {
    titleKey: "AuthForm.errors.reset_password.token_not_provided.title",
    descriptionKey:
      "AuthForm.errors.reset_password.token_not_provided.description",
  },
};

export function ErrorToastListener() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const message = ERROR_MESSAGES[error];
    if (!message) return;

    showToast({
      title: t(message.titleKey),
      description: t(message.descriptionKey),
      type: TOAST_TYPES.error,
      opts: {
        timeout: 7500,
      },
    });

    router.replace(pathname, { scroll: false });
  }, [searchParams, pathname, router, t]);

  return null;
}
