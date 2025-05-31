"use client";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { containerVariants } from "@/constants/animationVariants";
import { useQuerySpinner } from "@/hooks";
import { spinnerService, useUpdatePayerMutation } from "@/services";
import {
  useCreateUserInfoTemplateMutation,
  useGetUserInfoTemplatesQuery,
  useUpdateUserInfoTemplateMutation,
} from "@/services/userInfoService";
import { ProfileForm } from "@/types/profile";
import { UseInfoRequest } from "@/types/useInfo";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Profile() {
  const { data: defaultTemplate } = useQuerySpinner(
    useGetUserInfoTemplatesQuery("default=true")
  );

  const [createUserInfoTemplate] = useCreateUserInfoTemplateMutation();
  const [updateUserInfoTemplate] = useUpdateUserInfoTemplateMutation();

  const [updatePayer] = useUpdatePayerMutation();

  const profileMethods = useForm<ProfileForm>();
  const { reset: resetProfile } = profileMethods;

  useEffect(() => {
    if (defaultTemplate) {
      resetProfile({
        name: defaultTemplate.name || "",
        email: defaultTemplate.email || "",
        address: defaultTemplate.address || "",
      });
    }
  }, [defaultTemplate]);

  const onSubmitProfile = async (data: ProfileForm) => {
    const submitData: UseInfoRequest = {
      name: data.name,
      address: data.address,
      email: data.email,
      isDefault: true,
    };

    let result;
    if (!defaultTemplate) {
      result = await spinnerService.executePromises(
        createUserInfoTemplate(submitData)
      );
    } else {
      result = await spinnerService.executePromises(
        updateUserInfoTemplate({ id: defaultTemplate.id, data: submitData })
      );
    }

    if (result?.error) {
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
      </div>
    </div>
  );
}
