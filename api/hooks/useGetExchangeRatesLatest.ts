"use client";

import { useQuery } from "@tanstack/react-query";
import { exchangeRatesApi } from "../list/exchangeRatesApi";

export function useGetExchangeRatesLatest() {
  return useQuery({
    queryKey: ["latestExchangeRates"],
    queryFn: exchangeRatesApi.getLatestExchangeRates,
    refetchInterval: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
