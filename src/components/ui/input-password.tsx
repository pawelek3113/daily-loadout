"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { ComponentProps, useState } from "react";
import { Button } from "./button";

export function PasswordInput({
  className,
  ...props
}: Omit<ComponentProps<typeof Input>, "type">) {
  const [visible, setVisible] = useState(false);

  const t = useTranslations();

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <div className="absolute inset-y-0 right-3 flex items-center">
        <Button
          onClick={() => setVisible((prev) => !prev)}
          variant="ghost"
          type="button"
          aria-label={
            visible ? t("AuthForm.hide_password") : t("AuthForm.show_password")
          }
          size="icon"
        >
          {visible ? (
            <EyeSlashIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
