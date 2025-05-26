"use client";

import { AuthLayout } from "@/app/components";
import { useSearchParams } from "next/navigation";
import { CreateAccount } from "./CreateAccount";
import { CreateProfile } from "./CreateProfile";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const isProfile = searchParams.get("userId") || undefined;

  return (
    <AuthLayout
      title={isProfile ? "Create your profile" : "Create your account"}
      footerConfig={
        isProfile
          ? undefined
          : {
              description: "Already have an account?",
              link: "/login",
              linkText: "Sign in",
            }
      }
      subTitle={
        isProfile &&
        "Your profile information will be the information in the future documents (purchase order/payment voucher, etc.)"
      }
    >
      {/* {isProfile ? <CreateProfile /> : <CreateAccount />} */}
      <CreateAccount />
      {/* <CreateProfile /> */}
    </AuthLayout>
  );
}
