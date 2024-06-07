import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};

// Number Format
export const numberFormat = (number: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 1,
  });

  if (number < 1000) {
    return formatter.format(number);
  } else if (number < 1000000) {
    return formatter.format(number / 1000) + " rb";
  } else if (number < 1000000000) {
    return formatter.format(number / 1000000) + " jt";
  } else {
    return formatter.format(number / 1000000000) + " M";
  }
};

export const numberFormatWihoutInfo = (number: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 1,
  });

  return formatter.format(number);
};

// Curreny Format
export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCurrencyWithFormatterNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 1,
  });

  if (value < 1000) {
    return formatter.format(value).slice(0, -2);
  } else if (value < 1000000) {
    return formatter.format(value / 1000).slice(0, -2) + "rb";
  } else if (value < 1000000000) {
    return formatter.format(value / 1000000) + "jt";
  } else {
    return formatter.format(value / 1000000000) + "M";
  }
};

export function convertAmountFromMilliunits(amount: number) {
  return Math.round(amount / 1000);
}

export function convertAmountToMilliunits(amount: number) {
  return Math.round(amount * 1000);
}

export const getInitialName = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const maxLengthCheck = (e: any) => {
  const inputValueWithoutSpaces = e.target.value.replace(/\s/g, "");
  const maxLengthWithoutSpaces = e.target.maxLength;

  if (inputValueWithoutSpaces.length > maxLengthWithoutSpaces) {
    e.preventDefault();
  }
};

// Date Format
export const dateFormat = (date: Date | string) => {
  const jakartaTimezone = "Asia/Jakarta";

  return formatInTimeZone(new Date(date), jakartaTimezone, "ccc, d MMM yyyy");
};

export const dateDistanceFormatWithTimeZone = (date: Date) => {
  const jakartaTimezone = "Asia/Jakarta";
  const zonedDate = toZonedTime(new Date(date), jakartaTimezone);

  const formattedDate = formatDistanceToNow(zonedDate, { addSuffix: true });

  return formattedDate;
};
