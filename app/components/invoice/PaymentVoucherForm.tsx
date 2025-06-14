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
import { PayerCombined, ReceiverCombined } from "./InvoiceMain";
import { PayerSection } from "./PayerSection";
import { ReceiverSection } from "./ReceiverSection";
import { VoucherItemTable } from "./VoucherItemTable";
import { VoucherSection } from "./VoucherSection";

interface PaymentVoucherFormProps {
  receiversData?: ReceiverCombined;
}

const PaymentVoucherForm = () => {
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
    <InvoiceContainer title="Payment Voucher" invoiceLabel={invoiceLabel}>
      <div className="space-y-3">
        {/* Voucher Details */}
        <VoucherSection
          numberTitle="Voucher Number"
          className="grid grid-cols-2 gap-4 items-start"
        >
          <div className="space-y-2 !-mt-2">
            <Label className="!text-label font-medium text-gray-700">
              Date
            </Label>
            <div className="bg-white text-gray-600 !mt-1">
              <DatePickerFormField name="details.invoiceDate" />
            </div>
          </div>
        </VoucherSection>

        {/* Payer Details */}
        <PayerSection />

        {/* Receiver Details */}
        <ReceiverSection />

        {/* Items Table */}
        <VoucherItemTable />
      </div>
    </InvoiceContainer>
  );
};

export default PaymentVoucherForm;
