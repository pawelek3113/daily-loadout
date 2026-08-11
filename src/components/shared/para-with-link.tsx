"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MouseEvent } from "react";

type ParagraphLinkProps = {
  translationKey: string;
  href?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
};

export const ParagraphLink = ({
  translationKey,
  href,
  className,
  onClick,
}: ParagraphLinkProps) => {
  const t = useTranslations();
  return (
    <p className={cn("text-muted-foreground text-xs font-medium", className)}>
      {t.rich(translationKey, {
        link: (chunks) =>
          href ? (
            <Link href={href} className="text-hyperlink">
              {chunks}
            </Link>
          ) : (
            <span className="text-hyperlink" onClick={onClick}>
              {chunks}
            </span>
          ),
      })}
    </p>
  );
};
