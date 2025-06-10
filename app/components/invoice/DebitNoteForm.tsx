import { Label } from "@/components/ui/label";
import { useQuerySpinner } from "@/hooks/useQuerySpinner";
import { useGetCompanyQuery } from "@/services/companyService";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DatePickerFormField } from "..";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { InvoiceContainer } from "./InvoiceContainer";
import { InvoiceItemTable } from "./InvoiceItemTable";
import { ReceiverSection } from "./ReceiverSection";
import { SectionContainer } from "./SectionContainer";

const DebitNoteForm = () => {
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
    <InvoiceContainer title="Debit Note">
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="details.debitNoteNumber"
                label="Debit Note Number"
              />
              <FormInput
                name="details.invoiceNumber"
                label="Reference Invoice No"
              />
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Debit Note Date
                </Label>
                <div className="bg-white text-gray-600 ">
                  <DatePickerFormField name="details.invoiceDate" />
                </div>
              </div>
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Due Date
                </Label>
                <div className="bg-white text-gray-600 ">
                  <DatePickerFormField name="details.dueDate" />
                </div>
              </div>
              <FormInput name="details.term" label="Terms" />
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Reference Invoice Date
                </Label>
                <div className="bg-white text-gray-600 ">
                  <DatePickerFormField name="details.refInvoiceDate" />
                </div>
              </div>
            </div>
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
        <InvoiceItemTable title="Debit Note Items" />
      </div>
    </InvoiceContainer>
  );
};

export default DebitNoteForm;
