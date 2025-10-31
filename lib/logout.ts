"use client";

import { removeAuthToken } from "./auth";

export function logout() {
  removeAuthToken();
  window.location.href = "/login";
}
