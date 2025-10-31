"use server";
import ky, { Options } from "ky";
import { cookies } from "next/headers";
import { httpResponse } from "./apiClient";

const serverClient = ky.create({
  prefixUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export async function serverRequest<T>(
  url: string,
  options?: Options
): Promise<httpResponse<T>> {
  const response = await serverClient(url, options);
  return response.json() as Promise<httpResponse<T>>;
}
