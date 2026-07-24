import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (s: string) => {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1, s.length))
    .join(" ");
};
