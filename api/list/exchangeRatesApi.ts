import { request } from "@/api/apiClient";
import { GetExchangeRatesLatestResponse } from "../types/exchangeRates";

export const exchangeRatesApi = {
  getLatestExchangeRates: () => {
    return request<GetExchangeRatesLatestResponse[]>("exchange-rates/latest");
  },
};
