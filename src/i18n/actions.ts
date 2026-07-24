"use server";

import { cookies } from "next/headers";
import { Locale } from "./locales";

export const setUserLocale = async (locale: Locale) => {
  const store = await cookies();
  store.set("locale", locale, {
    maxAge: 31536000,
    httpOnly: true,
    sameSite: "lax",
  });
};
