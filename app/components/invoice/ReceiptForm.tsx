import { Label } from "@/components/ui/label";
import { useQuerySpinner } from "@/hooks";
import { useGetCompanyQuery } from "@/services";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import ReceiptItems from "./form/sections/ReceiptItems";
import { InvoiceContainer } from "./InvoiceContainer";
import { ReceiverSection } from "./ReceiverSection";
import { SectionContainer } from "./SectionContainer";
import { ShipmentSection } from "./ShipmentSection";

export const ReceiptForm = () => {
  const { setValue, watch } = useFormContext();
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
    setValue("details.taxDetails.amountType", "percentage");
    setValue("details.taxDetails.amount", 5);
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput name="details.invoiceNumber" label="Receipt Number" />
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Receipt Date
              </Label>
              <div className="bg-white text-gray-600 ">
                <DatePickerFormField name="details.invoiceDate" />
              </div>
            </div>
          </div>
        </div>
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

        <ReceiptItems />
      </div>
    </InvoiceContainer>
  );
};
