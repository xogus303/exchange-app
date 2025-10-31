import { request } from "../apiClient";
import { serverRequest } from "../serverClient";
import {
  GetOrdersQuoteRequest,
  GetOrdersQuoteResponse,
  GetOrdersResponse,
  PostOrdersRequest,
} from "../types/orders";

export const ordersApi = {
  getOrdersQuote: ({
    fromCurrency,
    toCurrency,
    forexAmount,
  }: GetOrdersQuoteRequest) =>
    request<GetOrdersQuoteResponse>("orders/quote", {
      searchParams: { fromCurrency, toCurrency, forexAmount },
    }),
  postOrders: (data: PostOrdersRequest) =>
    request("orders", {
      json: data,
      method: "post",
    }),
};

export const serverOrdersApi = {
  getOrders: () => serverRequest<GetOrdersResponse[]>("orders"),
};
