"use client";
import { spinnerService, useLogoutMutation } from "@/services";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await spinnerService.executePromises(logout());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout, router]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);
  return null;
}
