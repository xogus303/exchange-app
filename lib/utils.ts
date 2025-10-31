import { TCurrency } from "@/api/types/exchangeRates";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(currency: TCurrency) {
  switch (currency) {
    case "USD":
      return { country: "미국", money: "달러", symbol: "$", flag: "🇺🇸" };
    case "JPY":
      return { country: "일본", money: "엔화", symbol: "₩", flag: "🇯🇵" };
    case "KRW":
      return { country: "한국", money: "원", symbol: "₩", flag: "🇰🇷" };
  }
}

export function formatComma(
  value: number | string,
  minDecimals = 0,
  maxDecimals = 0
) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";
  return num.toLocaleString("ko-KR", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
}

export function removeComma(value: string) {
  return value.replace(/,/g, "");
}
