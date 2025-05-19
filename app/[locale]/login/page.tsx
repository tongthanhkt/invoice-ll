"use client";

import { AuthLayout } from "@/app/components";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { toast } from "@/components/ui/use-toast";
import {
  buttonAnimationVariants,
  containerVariants,
  itemVariants,
} from "@/constants/animationVariants";
import { useLoginMutation } from "@/services";
import { spinnerService } from "@/services/spinner.service";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await spinnerService.executePromises(login({ email, password }));
      router.push("/invoice");
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Invalid email or password",
      });
    }
  };

  return (
    <AuthLayout
      title="Login to your account"
      footerConfig={{
        description: "Don't have an account?",
        link: "/register",
        linkText: "Sign up",
      }}
    >
      <motion.form
        className="space-y-4 w-full"
        onSubmit={handleSubmit}
        initial="hidden"
        variants={containerVariants}
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <FormInput
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email address"
            placeholder="Enter your email address"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormInput
            name="password"
            type="password"
            required
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        <div className="flex justify-end mb-2">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          variants={buttonAnimationVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Sign in
        </motion.button>
      </motion.form>
    </AuthLayout>
  );
}
