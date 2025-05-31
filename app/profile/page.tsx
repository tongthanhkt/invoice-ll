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
import { Building2, User } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Define company form type
type CompanyForm = {
  name: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
  phone_number: string;
};

export default function Profile() {
  const { data: firstPayer } = useQuerySpinner(useFirstPayerQuery());
  const [updatePayer] = useUpdatePayerMutation();

  const profileMethods = useForm<ProfileForm>();
  const companyMethods = useForm<CompanyForm>();
  const { reset: resetProfile } = profileMethods;
  const { reset: resetCompany } = companyMethods;

  useEffect(() => {
    if (firstPayer) {
      resetProfile({
        name: firstPayer.payer?.name || "",
        email: firstPayer.payerEmail?.email || "",
        address: firstPayer.payerAddress?.address || "",
      });
    }
  }, [firstPayer]);

  const onSubmitProfile = async (data: ProfileForm) => {
    const submitData: ProfileRequest = {
      payer: {
        id: firstPayer?.payer?._id || "",
        name: data.name,
      },
      payerEmail: {
        id: firstPayer?.payerEmail?._id || "",
        email: data.email,
      },
      payerAddress: {
        id: firstPayer?.payerAddress?._id || "",
        address: data.address,
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

  const onSubmitCompany = async (data: CompanyForm) => {
    console.log("🚀 ~ onSubmitCompany ~ data:", data);
    // try {
    //   const response = await fetch("/api/company", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) {
    //     const error = await response.json();
    //     throw new Error(error.error || "Failed to create company");
    //   }
    //   toast({
    //     title: "Company created",
    //     description: "Your company has been created successfully",
    //     variant: "default",
    //   });
    //   resetCompany();
    // } catch (error) {
    //   toast({
    //     description:
    //       error instanceof Error ? error.message : "An error occurred",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-8 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Profile Form */}
        <FormProvider {...profileMethods}>
          <motion.form
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={profileMethods.handleSubmit(onSubmitProfile)}
          >
            <div className="flex flex-col gap-8 max-w-lg w-full mx-auto p-8 rounded-2xl shadow-xl bg-white border border-gray-100">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    Update profile
                  </div>
                  <div className="text-sm text-gray-500">
                    Your profile information will be used in future documents
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <FormInput name="name" label="Name" required />
                <FormInput
                  name="email"
                  label="Payer Email"
                  type="email"
                  required
                />
                <FormInput name="address" label="Payer Address" />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors text-base"
              >
                Save Profile
              </Button>
            </div>
          </motion.form>
        </FormProvider>

        {/* Company Form */}
        <FormProvider {...companyMethods}>
          <motion.form
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={companyMethods.handleSubmit(onSubmitCompany)}
          >
            <div className="flex flex-col gap-8 max-w-lg w-full mx-auto p-8 rounded-2xl shadow-xl bg-white border border-gray-100">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    Company Information
                  </div>
                  <div className="text-sm text-gray-500">
                    Your company information for business documents
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <FormInput name="name" label="Company Name" required />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="email"
                    label="Company Email"
                    type="email"
                    required
                  />
                  <FormInput name="phone_number" label="Phone Number" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <FormInput name="address" label="Company Address" />
                  <FormInput name="city" label="City" />
                  <FormInput name="zipcode" label="Zip Code" />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors text-base"
              >
                Save Company
              </Button>
            </div>
          </motion.form>
        </FormProvider>
      </div>
    </div>
  );
}
