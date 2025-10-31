import { request } from "@/api/apiClient";
import { LoginRequest, LoginResponse } from "@/api/types/auth";

export const authApi = {
  login: ({ email }: LoginRequest) => {
    return request<LoginResponse>("auth/login", {
      method: "POST",
      searchParams: { email },
      // credentials: undefined,
    });
  },
};
