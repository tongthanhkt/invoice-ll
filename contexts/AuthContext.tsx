"use client";

import { useQuerySpinner } from "@/hooks";
import { useGetProfileQuery } from "@/services";
import { authService } from "@/services/auth/authService";
import { spinnerService } from "@/services/spinner.service";
import { User } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuerySpinner(useGetProfileQuery(undefined, { skip: isAuthPage }));

  // Fetch user data on mount and after login
  useEffect(() => {
    if (!isAuthPage) {
      refetch();
    }
  }, [isAuthPage, refetch]);
  const [loading, setLoading] = useState<boolean>(false);

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
