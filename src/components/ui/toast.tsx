"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  isToastType,
  TOAST_TYPES,
  toastSecondaryVariants,
  ToastType,
  toastVariants,
} from "@/lib/toast-variants";
import { cn } from "@/lib/utils";
import {
  CheckFatIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { XIcon } from "lucide-react";

const toast = ToastPrimitive.createToastManager();

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
        className
      )}
      {...props}
    />
  );
}

function Toast({
  className,
  type,
  ...props
}: ToastPrimitive.Root.Props & { type: ToastType }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        toastVariants({
          type,
          className: [
            "group/toast focus-visible:border-ring focus-visible:ring-ring/50 pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom shadow-lg will-change-transform outline-none select-none focus-visible:ring-[3px]",
            "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
            "h-(--height) transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
            "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
            "data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
            "data-limited:opacity-0 data-starting-style:transform-[translateY(150%)]",
            "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
            "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
            "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
            "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
            "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
            "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
            "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
            "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
            "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
            className,
          ].join(" "),
        })
      )}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  type,
  ...props
}: ToastPrimitive.Description.Props & { type: ToastType }) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn(toastSecondaryVariants({ type }), className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  toastType,
  ...props
}: ToastPrimitive.Close.Props & { toastType: ToastType }) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        toastSecondaryVariants({ type: toastType }),
        [
          "relative shrink-0 after:absolute after:-inset-2 after:content-['']",
          className,
        ].join("")
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({ type }: { type?: ToastType }) {
  let icon: React.ReactNode = null;

  if (type === TOAST_TYPES.success) {
    icon = <CheckFatIcon aria-hidden="true" weight="fill" className="size-5" />;
  }

  if (type === TOAST_TYPES.info) {
    icon = <InfoIcon aria-hidden="true" weight="fill" className="size-5" />;
  }

  if (type === TOAST_TYPES.error) {
    icon = <XCircleIcon aria-hidden="true" weight="fill" className="size-5" />;
  }

  if (type === TOAST_TYPES.warning) {
    icon = <WarningIcon aria-hidden="true" weight="fill" className="size-5" />;
  }

  if (type === TOAST_TYPES.loading) {
    icon = (
      <SpinnerIcon
        aria-hidden="true"
        weight="bold"
        className="size-5 animate-spin"
      />
    );
  }

  if (!icon) {
    return null;
  }

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => {
    const type: ToastType = isToastType(toastItem.type)
      ? toastItem.type
      : "default";

    return (
      <Toast key={toastItem.id} toast={toastItem} type={type}>
        <ToastContent>
          <ToastIcon type={type} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <ToastTitle />
            <ToastDescription type={type} />
          </div>
          <ToastAction />
          <ToastClose toastType={type} />
        </ToastContent>
      </Toast>
    );
  });
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  createToastManager,
  Toast,
  toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToastManager,
};
