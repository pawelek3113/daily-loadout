import { cva } from "class-variance-authority";

const toastTypeStyles = {
  default: "text-foreground bg-background",
  info: "text-info bg-info-muted border-info-muted-2",
  success: "text-success bg-success-muted border-success-muted-2",
  error: "text-destructive bg-destructive-muted border-destructive-muted-2",
  warning: "text-warning bg-warning-muted border-warning-muted-2",
  loading: "text-foreground bg-background",
} as const;

const toastSecondaryStyles = {
  default: "text-foreground",
  info: "text-info-subtle",
  success: "text-success-subtle",
  error: "text-destructive-subtle",
  warning: "text-warning-subtle",
  loading: "text-foreground",
} as const;

export type ToastType = keyof typeof toastTypeStyles;

export const TOAST_TYPES = {
  default: "default",
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  loading: "loading",
} as const satisfies Record<ToastType, ToastType>;

export const toastVariants = cva("text-sm rounded-4xl border-8 font-semibold", {
  variants: {
    type: toastTypeStyles,
  },
  defaultVariants: {
    type: "default",
  },
});

export const toastSecondaryVariants = cva("text-sm font-normal", {
  variants: {
    type: toastSecondaryStyles,
  },
  defaultVariants: {
    type: "default",
  },
});

export const isToastType = (type?: string): type is ToastType => {
  return type !== undefined && type in toastTypeStyles;
};
