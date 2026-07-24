"use client";
import { Button } from "@/components/ui/button";
import { setUserLocale } from "@/i18n/actions";
import { Locale, locales } from "@/i18n/locales";
import { capitalize } from "@/lib/utils";
import { TranslateIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const LanguageToggleButton = () => {
  const t = useTranslations("locale");
  const router = useRouter();

  const handleClick = async (locale: Locale) => {
    await setUserLocale(locale);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <TranslateIcon size={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-24">
        <DropdownMenuGroup>
          {locales.map((item) => (
            <DropdownMenuItem key={item} onClick={() => handleClick(item)}>
              {capitalize(t(item))}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
