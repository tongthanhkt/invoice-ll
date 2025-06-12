import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { useQuerySpinner } from "@/hooks";
import { useGetCompanyQuery } from "@/services";
import { useFormContext } from "react-hook-form";
import { ShipmentSection } from "./ShipmentSection";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { SectionContainer } from "./SectionContainer";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import DeliveryOderTable from "./form/sections/DeliveryOderTable";

export const DeliveryOrderForm = () => {
  const { data: company } = useQuerySpinner(useGetCompanyQuery());

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (company) {
      setValue("company.name", company.name);
      setValue("company.email", company.email);
    }
  }, [company]);
  return (
    <InvoiceContainer title="Delivery Order">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput name="details.invoiceNumber" label="Invoice no." />
          <FormInput name="details.jobNo" label="Job No." />
        </div>
        <ShipmentSection
          title="Delivery Information"
          hideCompanyName
          hidePhoneNumber
        />
        <SectionContainer title=" Shipping Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Date
              </Label>
              <div className="bg-white text-gray-600 ">
                <DatePickerFormField name="details.date" />
              </div>
            </div>
            <FormInput name="details.ODNo" label="O/D No." />
            <FormInput name="details.lotNo" label="Lot No." />
            <FormInput name="details.containerNo" label="Container No." />
            <FormInput name="details.flightNo" label="Flight No." />
            <FormInput name="details.eta" label="E.T.A" />
            <FormInput name="details.formType" label="Form Type" />
            <FormInput name="details.loadingPort" label="Loading Port" />
          </div>
        </SectionContainer>
        <DeliveryOderTable />
      </div>
    </InvoiceContainer>
  );
};
