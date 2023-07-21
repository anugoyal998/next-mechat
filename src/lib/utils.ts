import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

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

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}

export function fetchAll<T, U>(
  data: U[],
  cb: (
    resolve: (value: T | PromiseLike<T | null> | null) => void,
    reject: (reason?: any) => void,
    ele: U
  ) => void
) {
  let promises: Promise<T | null>[] = [];
  for (let i = 0; i < data.length; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        cb(resolve, reject, data[i]);
      })
    );
  }
  return promises;
}


export const TAKE_THRESHOLD = 10

export function reverseAppendList<T>(prev: T[],next: T[]){
  let revNext = next;revNext.reverse();
  let result = [...revNext,...prev];
  return result;
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}