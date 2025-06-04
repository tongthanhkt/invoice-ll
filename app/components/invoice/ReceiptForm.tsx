import { useQuerySpinner } from "@/hooks";
import { InvoiceContainer } from "./InvoiceContainer";
import { SectionContainer } from "./SectionContainer";
import { useGetCompanyQuery } from "@/services";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { ReceiverSection } from "./ReceiverSection";
import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import ReceiptItems from "./form/sections/ReceiptItems";
import { ShipmentSection } from "./ShipmentSection";

export const ReceiptForm = () => {
  const { data: company } = useQuerySpinner(useGetCompanyQuery());
  const { setValue, watch } = useFormContext();

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

  const receiptNumber = watch("details.invoiceNumber");

  const invoiceLabel = useMemo(() => {
    if (receiptNumber) {
      return `#${receiptNumber}`;
    } else {
      return "New Receipt";
    }
  }, [receiptNumber]);

  return (
    <InvoiceContainer title="Receipt" invoiceLabel={invoiceLabel}>
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput name="details.invoiceNumber" label="Receipt Number" />
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Receipt Date
                </Label>
                <div className="bg-white text-gray-600 ">
                  <DatePickerFormField name="receipt.date" />
                </div>
              </div>
            </div>
            <FormInput name="details.remarks" label="Remarks" />
          </div>
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
        <ReceiverSection
          title={"Bill To"}
          label={{
            name: "Billing",
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
      </div>
    </InvoiceContainer>
  );
};
