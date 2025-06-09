import React from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { SectionContainer } from "./SectionContainer";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { DatePickerFormField } from "..";
import { Label } from "@/components/ui/label";
import { PayerSection } from "./PayerSection";
import { ProviderSection } from "./ProviderSection";

export const AcceptanceReport = () => {
  return (
    <InvoiceContainer title="Acceptance Report">
      <SectionContainer title="Details">
        <FormInput name="acceptance.programName" label="Programing Name" />
        <FormInput name="acceptance.address" label="Location" />
        <div className="space-y-1">
          <Label className="!text-label font-medium text-neutral-700">
            Date
          </Label>
          <div className="bg-white text-gray-600">
            <DatePickerFormField name="details.invoiceDate" />
          </div>
        </div>
      </SectionContainer>
      <PayerSection />
      <ProviderSection />

      <SectionContainer title="Deal details">
        <FormInput name="acceptance.content" label="Subject of the agreement" />
        
      </SectionContainer>
    </InvoiceContainer>
  );
};
