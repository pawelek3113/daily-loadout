import { isToastType, ToastType } from "./toast-variants";

type ToastMessageContent = {
  titleKey: string;
  descriptionKey: string;
};

export const TOAST_MESSAGES = {
  "reset_password.token_not_provided": {
    titleKey: "AuthForm.errors.reset_password.token_not_provided.title",
    descriptionKey:
      "AuthForm.errors.reset_password.token_not_provided.description",
  },
} as const satisfies Record<string, ToastMessageContent>;

export type ToastMessageKey = keyof typeof TOAST_MESSAGES;

const isToastMessageKey = (key?: string): key is ToastMessageKey => {
  return key !== undefined && key in TOAST_MESSAGES;
};

/**
 * Displays a toast message after redirection.
 *
 * Intended for use in Server Components.
 */
export const buildToastRedirectUrl = (
  path: string,
  type: ToastType,
  messageKey: ToastMessageKey
): string => {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}toast=${type}:${messageKey}`;
};

export const getToastMessageFromUrlParam = (
  url: string
): { type: ToastType | null; key: ToastMessageKey | null } => {
  const [type, key] = url.split(":");

  if (!isToastType(type) || !isToastMessageKey(key)) {
    return { type: null, key: null };
  }

  return { type, key };
};
