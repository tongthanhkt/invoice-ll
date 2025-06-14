"use client";

import { useMemo } from "react";
// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn
import { Label } from "@/components/ui/label";

// Components
import { DatePickerFormField } from "@/app/components";

// Contexts
import { InvoiceContainer } from "./InvoiceContainer";
import { InvoiceItemTable } from "./InvoiceItemTable";
import { PayerCombined, ReceiverCombined } from "./InvoiceMain";
import { PayerSection } from "./PayerSection";
import { ReceiverSection } from "./ReceiverSection";
import { VoucherSection } from "./VoucherSection";

const InvoiceForm = () => {
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
      return "New Invoice";
    }
  }, [invoiceNumber]);

  return (
    <InvoiceContainer title="Invoice" invoiceLabel={invoiceLabel}>
      <div className="space-y-4">
        {/* Voucher Details */}
        <VoucherSection numberTitle="Invoice Number">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.invoiceDate" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Due Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.dueDate" />
              </div>
            </div>
          </div>
        </VoucherSection>

        {/* Payer Details */}
        <PayerSection />

        {/* Receiver Details */}
        <ReceiverSection />

        {/* Items Table */}
        <InvoiceItemTable />
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceForm;
