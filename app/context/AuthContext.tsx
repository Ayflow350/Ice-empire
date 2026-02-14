"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, User } from "@/lib/api/auth"; // Importing types from your API layer

// 1. Define the Shape of the Context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

// 2. Create Context with undefined initial value
// This forces us to check if the Provider exists in the custom hook
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define Props Interface
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // --- Action: Check Session ---
  const checkUser = async (): Promise<void> => {
    try {
      // The authApi.getCurrentUser returns Promise<{ user: User | null }>
      const data = await authApi.getCurrentUser();

      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error: unknown) {
      // We don't crash the app if session check fails, just ensure user is null
      console.error("Session check failed", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Effect: Run check on mount ---
  useEffect(() => {
    checkUser();
  }, []);

  // --- Action: Login ---
  const login = (userData: User): void => {
    setUser(userData);
    router.refresh(); // Refreshes Server Components (like Navbar)
  };

  // --- Action: Logout ---
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      router.push("/auth/signin");
      router.refresh();
    } catch (error: unknown) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Derived State ---
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        login,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for consumption
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
