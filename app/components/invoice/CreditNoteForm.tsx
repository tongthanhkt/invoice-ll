import React, { useEffect, useMemo } from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { useFormContext, useWatch } from "react-hook-form";
import { SectionContainer } from "./SectionContainer";
import { Label } from "@/components/ui/label";
import { DatePickerFormField } from "..";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { useQuerySpinner } from "@/hooks";
import { useGetCompanyQuery } from "@/services";
import { ProviderSection } from "./ProviderSection";
import CreditNoteItems from "./form/sections/CreditNoteItems";

const CreditNoteForm = () => {
  const { control, setValue } = useFormContext();
  const { data: company } = useQuerySpinner(useGetCompanyQuery());
  useEffect(() => {
    if (company) {
      setValue("company.name", company.name);
      setValue("company.address", company.address);
      setValue("company.city", company.city);
      setValue("company.zipCode", company.zipcode);
      setValue("company.phone", company.phone_number);
      setValue("company.email", company.email);
    }
    setValue("details.creditNoteNumber", "0002");
  }, [company]);
  // Get invoice number variable
  const creditNoteNumber = useWatch({
    name: "details.creditNoteNumber",
    control,
  });

  const invoiceLabel = useMemo(() => {
    if (creditNoteNumber) {
      return `#${creditNoteNumber}`;
    } else {
      return "New Credit Note";
    }
  }, [creditNoteNumber]);
  return (
    <InvoiceContainer title="Credit Note" invoiceLabel={invoiceLabel}>
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput
              name="details.creditNoteNumber"
              label="Credit no."
              placeholder="Credit no."
              type="number"
            />
            <FormInput
              name="details.invoiceNumber"
              label="Invoice no."
              placeholder="Original Invoice no."
              type="number"
            />
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Credit date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.creditDate" />
              </div>
            </div>
            <FormInput
              name="details.creditType"
              label="Credit type"
              placeholder="Credit type"
            />
          </div>
          <FormInput
            name="details.contact"
            label="Contact"
            placeholder="Contact"
            type="text"
          />
        </SectionContainer>
        <SectionContainer title="Company Details">
          <div className="space-y-4">
            <FormInput name="company.name" label="Company Name" />
            <FormInput name="company.address" label="Address" />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="company.city" label="City" />
              <FormInput name="company.zipCode" label="Zip Code" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="company.phone" label="Phone Number" />
              <FormInput name="company.email" label="Email" />
            </div>
          </div>
        </SectionContainer>
        <ProviderSection title="Provider Details" />
        <SectionContainer title="Project Details">
          <FormInput name="details.projectName" label="Project Name" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                From
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.startProjectDate" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                To
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.endProjectDate" />
              </div>
            </div>
          </div>
        </SectionContainer>
        <CreditNoteItems />
      </div>
    </InvoiceContainer>
  );
};
export default CreditNoteForm;
