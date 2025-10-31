import { request } from "../apiClient";
import { GetWalletsResponse } from "../types/wallets";

export const walletsApi = {
  getWallets: () => {
    return request<GetWalletsResponse>("wallets");
  },
};
