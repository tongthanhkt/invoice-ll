import { useQuerySpinner } from "@/hooks";
import { InvoiceContainer } from "./InvoiceContainer";
import { SectionContainer } from "./SectionContainer";
import { useGetCompanyQuery } from "@/services";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { ReceiverSection } from "./ReceiverSection";
import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import ReceiptItems from "./form/sections/ReceiptItems";
import { ShipmentSection } from "./ShipmentSection";

export const ReceiptForm = () => {
  const { data: company } = useQuerySpinner(useGetCompanyQuery());
  const { setValue } = useFormContext();

  useEffect(() => {
    if (company) {
      setValue("company.name", company.name);
      setValue("company.address", company.address);
      setValue("company.city", company.city);
      setValue("company.zipCode", company.zipcode);
      setValue("company.phone", company.phone_number);
      setValue("company.email", company.email);
    }
  }, [company]);
  return (
    <InvoiceContainer title="Receipt">
      <SectionContainer title="Details">
        <FormInput name="receipt.number" label="Receipt Number" />
        <div className="space-y-1">
          <Label className="!text-label font-medium text-neutral-700">
            Receipt Date
          </Label>
          <div className="bg-white text-gray-600">
            <DatePickerFormField name="receipt.date" />
          </div>
        </div>
      </SectionContainer>
      <SectionContainer title="Company Details">
        <FormInput name="company.name" label="Company Name" />
        <FormInput name="company.address" label="Company Address" />
        <FormInput name="company.city" label="Company City" />
        <FormInput name="company.zipCode" label="Company Zip Code" />
        <FormInput name="company.phone" label="Company Phone" />
        <FormInput name="company.email" label="Company Email" />
      </SectionContainer>
      <ReceiverSection
        title={"Bill To"}
        label={{
          name: "Name",
          email: "Email",
          address: "Address",
          addBtn: "Add Billing",
        }}
      />
      <ShipmentSection
        title={"Ship To"}
        label={{
          name: "Name",
          address: "Address",
          addBtn: "Add Shipment",
        }}
      />
      <ReceiptItems />
    </InvoiceContainer>
  );
};
