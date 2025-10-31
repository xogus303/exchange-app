import { TCurrency } from "./exchangeRates";

export interface Wallets {
  walletId: number; // 1,
  currency: TCurrency; // "KRW",
  balance: number; // 1000000
}

export interface GetWalletsResponse {
  totalKrwBalance: number; // 1000000;
  wallets: Wallets[];
}
