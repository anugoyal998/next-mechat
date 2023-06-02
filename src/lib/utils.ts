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
    : `https://ui-avatars.com/api/?background=${intToRGB(
        hashCode(email ?? "email")
      )}&name=${email?.split("@")?.[0]}`;
}

function hashCode(str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

export function toPusherKey(key: string){
  return key.replace(/:/g,'__')
}