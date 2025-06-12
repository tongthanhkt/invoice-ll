import React, { useEffect } from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { SectionContainer } from "./SectionContainer";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { useFormContext } from "react-hook-form";
import { useGetCompanyQuery } from "@/services";
import { useQuerySpinner } from "@/hooks";
import { ReceiverSection } from "./ReceiverSection";
import { ShipmentSection } from "./ShipmentSection";
import CommercialInvoiceItems from "./form/sections/CommercialInvoiceItems";

export const CommercialInvoiceForm = () => {
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
    setValue("details.debitNoteNumber", "DN-001");
    setValue("details.refInvoiceDate", new Date());
    setValue("details.term", "Due on Receipt");
  }, [company]);
  return (
    <InvoiceContainer title="Commercial Invoice">
      <div className="space-y-4">
        <SectionContainer title="Company Details">
          <div className="space-y-4">
            <FormInput name="company.name" label="Company Name" />
            <FormInput name="company.address" label="Address" />
            <FormInput name="company.city" label="City" />
            <FormInput name="company.zipCode" label="Zip Code" />
            <FormInput name="company.phone" label="Phone Number" />
            <FormInput name="company.email" label="Email" />
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
        <ShipmentSection />
        <CommercialInvoiceItems />
      </div>
    </InvoiceContainer>
  );
};
