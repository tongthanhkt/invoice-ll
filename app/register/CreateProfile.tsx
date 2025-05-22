"use client";

import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { itemVariants } from "@/constants/animationVariants";
import { spinnerService, useCreateBusinessMutation } from "@/services";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { toast } from "@/components/ui/use-toast";
import {
  buttonAnimationVariants,
  containerVariants,
} from "@/constants/animationVariants";

export const CreateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const [createBusiness] = useCreateBusinessMutation();
  const userId = useSearchParams().get("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const res = await spinnerService.executePromises(
        createBusiness({ name, email, address, userId })
      );
      if (res.error) {
        if (
          "data" in res.error &&
          (res.error.data as { message: string }).message ===
          "BUSINESS_ALREADY_EXISTED"
        ) {
          toast({
            variant: "destructive",
            description: "Business already exists. Please try again.",
          });
          return;
        }
        toast({
          variant: "destructive",
          description: "Registration failed. Please try again.",
        });
        return;
      }
      router.push(`/login`);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <motion.form
      className="space-y-4 w-full"
      onSubmit={handleSubmit}
      initial="hidden"
      variants={containerVariants}
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <FormInput
          name="name"
          type="text"
          required
          placeholder="Full name/ Company name"
          label="Account name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormInput
          name="email"
          type="email"
          required
          label="ID/email"
          placeholder="Account ID/email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormInput
          name="address"
          type="text"
          label="Business Address"
          placeholder="Please enter your business address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        variants={buttonAnimationVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Confirm
      </motion.button>
    </motion.form>
  );
};
