"use client";

import { AuthLayout } from "@/app/components";
import { toast } from "@/components/ui/use-toast";
import {
  buttonAnimationVariants,
  containerVariants,
} from "@/constants/animationVariants";
import { spinnerService, useRegisterMutation } from "@/services";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CreateProfile } from "./CreateProfile";
import { CreateAccount } from "./CreateAccount";

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
      {isProfile ? <CreateProfile /> : <CreateAccount />}
      {/* <CreateProfile /> */}
    </AuthLayout>
  );
}
