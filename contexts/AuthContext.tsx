"use client";

import { useGetProfileQuery } from "@/app/store/api";
import { useQuerySpinner } from "@/hooks";
import { authService } from "@/services/auth/authService";
import { spinnerService } from "@/services/spinner.service";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: userData, isLoading } = useQuerySpinner(useGetProfileQuery());
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const withSpinner = async <T,>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    spinnerService.startSpinner();
    try {
      return await fn();
    } finally {
      spinnerService.endSpinner();
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    return withSpinner(async () => {
      try {
        await authService.login({ email, password });
        router.push("/invoice");
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: "Login failed" };
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return withSpinner(async () => {
      try {
        await authService.register({ name, email, password });
        router.push("/invoice");
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    });
  };

  const logout = async () => {
    return withSpinner(async () => {
      try {
        await authService.logout();
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    return withSpinner(async () => {
      await authService.updateProfile(data);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData?.user || null,
        loading: isLoading || loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
