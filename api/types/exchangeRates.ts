export type TCurrency = "USD" | "JPY" | "KRW";

export interface GetExchangeRatesLatestResponse {
  exchangeRateId: number; // 100,
  currency: TCurrency; // "USD",
  rate: number; // 1450.25,
  changePercentage: number; // 0.25,
  applyDateTime: string; // "2023-10-01T12:00:00"
}
