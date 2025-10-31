import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { walletsApi } from "../list/walletsApi";
import { httpResponse } from "../apiClient";
import { GetWalletsResponse } from "../types/wallets";

export function useGetWallets(
  options?: UndefinedInitialDataOptions<httpResponse<GetWalletsResponse>>
) {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: walletsApi.getWallets,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    ...options,
  });
}
