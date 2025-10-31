import { HTTPError } from "ky";
import { toast } from "sonner";
import { httpResponse } from "./apiClient";

class ApiError<T = unknown> extends Error {
  code: string;
  message: string;
  data?: T;

  constructor(response: httpResponse<T>) {
    super(response.message || "요청 처리 중 오류가 발생했습니다.");
    this.code = response.code;
    this.message = response.message;
    this.data = response.data;
  }
}

export async function handleApiError(error: unknown) {
  if (error instanceof HTTPError) {
    let parsed: httpResponse<unknown> = {
      code: "UNKNOWN",
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    try {
      const err = await error.response.json().catch(() => null);
      if (err && typeof err === "object") {
        parsed = {
          code: err.code ?? "UNKNOWN",
          message: err.message ?? "서버 오류가 발생했습니다.",
          data: err.data ?? null,
        };
      }

      // 인증 만료 시 로그인 페이지로 리다이렉트
      if (parsed.code === "UNAUTHORIZED" && typeof window !== "undefined") {
        document.cookie = "auth_token=; Max-Age=0; path=/";
        // Next 라우터 상태 초기화 (세션 캐시 잔여 방지)
        setTimeout(() => {
          alert("토큰 만료");
          window.location.href = "/login";
        }, 5000);
      }

      throw new ApiError({ ...err });
    } catch (err) {
      throw new ApiError({ ...(err as httpResponse<unknown>) });
    } finally {
      toast.error(parsed.message);
    }
  } else {
    console.error("[UNKNOWN ERROR]", error);
    toast.error("알 수 없는 오류가 발생했습니다.");
    throw error;
  }
}
