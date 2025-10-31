import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PostOrdersRequest } from "../types/orders";
import { ordersApi } from "../list/ordersApi";
import { httpResponse } from "../apiClient";

export default function usePostOrders({
  ...options
}: UseMutationOptions<
  httpResponse<unknown>,
  Error,
  PostOrdersRequest,
  unknown
>) {
  return useMutation({
    mutationFn: ordersApi.postOrders,
    ...options,
  });
}
