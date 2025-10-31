import { TCurrency } from "./exchangeRates";

export interface GetOrdersQuoteRequest {
  fromCurrency: string;
  toCurrency: string;
  forexAmount: number;
}

export interface GetOrdersQuoteResponse {
  krwAmount: number;
  appliedRate: number;
}

export interface PostOrdersRequest {
  exchangeRateId: number;
  fromCurrency: TCurrency;
  toCurrency: TCurrency;
  forexAmount: number;
}

export interface GetOrdersResponse {
  orderId: number; // 100,
  fromCurrency: TCurrency; // "KRW",
  fromAmount: number; // 10000,
  toCurrency: TCurrency; // "USD",
  toAmount: number; // 100,
  appliedRate: number; // 1450,
  orderedAt: string; // "2023-10-01T12:00:00"
}
