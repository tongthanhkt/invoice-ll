"use client";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { containerVariants } from "@/constants/animationVariants";
import { useQuerySpinner } from "@/hooks";
import { spinnerService } from "@/services";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "@/services/companyService";
import { ICompanyRequest } from "@/types/company";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
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

export default function MyCompany() {
  const companyMethods = useForm<CompanyForm>();
  const [updateCompany] = useUpdateCompanyMutation();

  const { data: company } = useQuerySpinner(useGetCompanyQuery());

  useEffect(() => {
    if (company) {
      companyMethods.reset({
        name: company.name,
        email: company.email,
        address: company.address,
        city: company.city,
        zipcode: company.zipcode,
        phone_number: company.phone_number,
      });
    }
  }, [company]);

  const onSubmitCompany = async (data: CompanyForm) => {
    const formattedData: ICompanyRequest = {
      ...data,
      id: company?.id,
    };
    const result = await spinnerService.executePromises(
      updateCompany(formattedData)
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
      title: "Company updated",
      description: "Your company has been updated successfully",
      variant: "default",
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-8 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
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
