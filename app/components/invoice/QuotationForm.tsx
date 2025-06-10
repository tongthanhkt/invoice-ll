import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import QuotationItems from "./form/sections/QuotationItems";
import { InvoiceContainer } from "./InvoiceContainer";
import { PayerSection } from "./PayerSection";
import { ReceiverSection } from "./ReceiverSection";
import { SectionContainer } from "./SectionContainer";

export const QuotationForm = () => {
  return (
    <InvoiceContainer title="Quotation">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
          <FormInput name="details.invoiceNumber" label="Quotation No" />
          <div className="space-y-1 -mt-2">
            <Label className="!text-label font-medium text-neutral-700">
              Quotation Date
            </Label>
            <div className="bg-white text-gray-600">
              <DatePickerFormField name="details.invoiceDate" />
            </div>
          </div>
        </div>
        <PayerSection title="Quotation by" />
        <ReceiverSection title="Quotation to" />
        <QuotationItems />

        <SectionContainer title="Additional information">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormInput
                name="details.contactInformation.email"
                label="Email"
              />
              <FormInput
                name="details.contactInformation.phone"
                label="Phone Number"
              />
            </div>
            <FormInput name="details.additionalNotes" label="Notes" />
          </div>
        </SectionContainer>
      </div>
    </InvoiceContainer>
  );
};
