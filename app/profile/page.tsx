"use client";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { containerVariants } from "@/constants/animationVariants";
import { useQuerySpinner } from "@/hooks";
import {
  spinnerService,
  useFirstPayerQuery,
  useUpdatePayerMutation,
} from "@/services";
import { ProfileForm, ProfileRequest } from "@/types/profile";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Profile() {
  const { data: firstPayer } = useQuerySpinner(useFirstPayerQuery());
  const [updatePayer] = useUpdatePayerMutation();

  const methods = useForm<ProfileForm>();
  const { reset } = methods;

  useEffect(() => {
    if (firstPayer) {
      reset({
        name: firstPayer.payer.name,
        email: firstPayer.payerEmail.email,
        address: firstPayer.payerAddress.address,
      });
    }
  }, [firstPayer]);

  const onSubmit = async (data: ProfileForm) => {
    if (!firstPayer) return;

    const submitData: ProfileRequest = {
      payer: {
        id: firstPayer?.payer._id,
        name: data.name,
      },
      payerEmail: {
        id: firstPayer?.payerEmail._id,
        email: data.email,
      },
      payerAddress: {
        id: firstPayer?.payerAddress._id,
      },
    };

    const result = await spinnerService.executePromises(
      updatePayer(submitData)
    );

    if (result.error) {
      toast({
        description:
          "data" in result.error
            ? (result.error.data as { error: string }).error
            : "message" in result.error
            ? result.error.message
            : "An error occurred",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
      variant: "default",
    });
  };

  return (
    <FormProvider {...methods}>
      <motion.form
        className="space-y-4 w-full flex items-center justify-center h-[calc(100vh_-64px)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <motion.div className="flex flex-col gap-4 max-w-md w-full p-6 rounded-lg shadow-md mx-8">
          <div className="text-2xl font-bold text-blue-500 text-center">
            Update profile
          </div>
          <FormInput name="name" label="Name" required />
          <FormInput name="email" label="Payer Email" type="email" required />
          <FormInput name="address" label="Payer Address" />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Save
          </Button>
        </motion.div>
      </motion.form>
    </FormProvider>
  );
}
