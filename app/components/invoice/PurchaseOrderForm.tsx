import React, { useMemo } from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { SectionContainer } from "./SectionContainer";
import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import { ReceiverSection } from "./ReceiverSection";
import { ProviderSection } from "./ProviderSection";
import { ShipmentSection } from "./ShipmentSection";
import PurchaseOrderItems from "./form/sections/PurchaseOrderItems";
import { useFormContext, useWatch } from "react-hook-form";

export const PurchaseOrderForm = () => {
  const { control } = useFormContext();

  // Get invoice number variable
  const invoiceNumber = useWatch({
    name: "details.invoiceNumber",
    control,
  });

  const invoiceLabel = useMemo(() => {
    if (invoiceNumber) {
      return `#${invoiceNumber}`;
    } else {
      return "P.O No";
    }
  }, [invoiceNumber]);

  return (
    <InvoiceContainer title="Purchase Order" invoiceLabel={invoiceLabel}>
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="details.invoiceNumber" label="P.O No" />
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  P.O Date
                </Label>
                <div className="bg-white text-gray-600">
                  <DatePickerFormField name="details.invoiceDate" />
                </div>
              </div>
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Promise Date
                </Label>
                <div className="bg-white text-gray-600">
                  <DatePickerFormField name="details.promiseDate" />
                </div>
              </div>
              <FormInput
                name="details.shippingMethod"
                label="Shipping methods"
              />
            </div>
            <FormInput name="details.paymentTerms" label="Payment terms" />
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

        <ProviderSection title="Vendor" />
        <ShipmentSection />

        <PurchaseOrderItems />
      </div>
    </InvoiceContainer>
  );
};
