"use client";

export async function getAuthToken() {
  const match = document.cookie.match(/(^| )auth_token=([^;]+)/);
  return match ? match[2] : null;
}

// (선택) JWT 토큰 검증 등 추가 기능
export async function isAuthenticated() {
  return Boolean(getAuthToken());
}

export async function setAuthToken(token: string) {
  document.cookie = `auth_token=${token}; path=/; SameSite=Lax; max-age=86400;`;
}

export async function removeAuthToken() {
  document.cookie = `auth_token=; path=/; Max-Age=0;`;
}
