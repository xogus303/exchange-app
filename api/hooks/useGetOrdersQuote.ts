import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { httpResponse } from "../apiClient";
import { GetOrdersQuoteResponse } from "../types/orders";
import { TCurrency } from "../types/exchangeRates";
import { ordersApi } from "../list/ordersApi";

interface useGetOrdersQuoteProps {
  from: TCurrency;
  to: TCurrency;
  amount: number;
}

export function useGetOrdersQuote({
  from,
  to,
  amount,
  ...options
}: useGetOrdersQuoteProps &
  UndefinedInitialDataOptions<httpResponse<GetOrdersQuoteResponse>>) {
  return useQuery({
    ...options,
    queryKey: options?.queryKey ?? ["orders", "quote"],
    queryFn: () =>
      ordersApi.getOrdersQuote({
        fromCurrency: from,
        toCurrency: to,
        forexAmount: amount,
      }),
  });
}
