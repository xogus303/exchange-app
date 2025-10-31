import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (token) => set({ token, isLoggedIn: !!token }),
  logout: () => set({ token: null, isLoggedIn: false }),
}));
