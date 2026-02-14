// lib/api/auth.ts
import { fetcher } from "./client";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export const authApi = {
  signup: (data: { name: string; email: string; password: string }) => {
    return fetcher<{ message: string }>("/auth/signup", {
      method: "POST",
      body: data,
    });
  },

  signin: (data: { email: string; password: string }) => {
    return fetcher<{ user: User }>("/auth/signin", {
      method: "POST",
      body: data,
    });
  },

  logout: () => {
    return fetcher<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  },

  // Called by your AuthContext to see if user is logged in
  getCurrentUser: () => {
    return fetcher<{ user: User | null }>("/auth/me");
  },
};
