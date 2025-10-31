import ky, { Options } from "ky";
import { handleApiError } from "./apiErrorHandler";
import { getAuthToken } from "@/lib/auth";

export type httpResponse<T> = {
  code: string;
  message: string;
  data: T;
};

const apiClient = ky.create({
  prefixUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.url.includes("/auth/login")) return;
        const token = await getAuthToken();

        if (!token) {
          if (typeof document !== "undefined") {
            window.location.replace("/login");
          }
          throw new Error("No auth token");
        }

        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    beforeError: [
      async (error) => {
        await handleApiError(error);
        return error;
      },
    ],
  },
  // credentials: "include",
});

// 공통 요청 함수.
export const request = async <T>(
  url: string,
  options?: Options
): Promise<httpResponse<T>> => {
  try {
    const response = await apiClient(url, options);
    return (await response.json()) as httpResponse<T>;
  } catch (error) {
    throw error;
  }
};
