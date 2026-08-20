"use client";

import {
  getToastMessageFromUrlParam,
  TOAST_MESSAGES,
} from "@/lib/toast-messages";
import { showToast, TOAST_DURATION } from "@/lib/toasts";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Catches toasts passed through search params, called on server side, renders them on the client.
 *
 * @see
 * Use {@link buildToastRedirectUrl} to create a valid URL containing toast info.
 * @see
 * Use {@link showToast} to show toast on the client.
 */
export function ToastListener() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();

  useEffect(() => {
    const param = searchParams.get("toast");

    if (!param) return;

    const { type, key } = getToastMessageFromUrlParam(param);

    if (!type || !key) {
      return;
    }

    const message = TOAST_MESSAGES[key];

    showToast({
      title: t(message.titleKey),
      description: t(message.descriptionKey),
      type,
      opts: {
        timeout: TOAST_DURATION.LONG,
      },
    });

    router.replace(pathname, { scroll: false });
  }, [searchParams, pathname, router, t]);

  return null;
}
