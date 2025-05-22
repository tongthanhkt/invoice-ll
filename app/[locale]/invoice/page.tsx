"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { InvoiceMain } from "@/app/components";

export default function InvoicePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="p-4 mx-4 md:mx-8 lg:mx-16 xl:mx-28 mt-4">
      <InvoiceMain />
    </div>
  );
}
