import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(
  url: string | null | undefined,
  email: string | null | undefined
) {
  return url
    ? url
    : `https://ui-avatars.com/api/?background=random&name=${
        email?.split("@")?.[0]
      }`;
}
