import React from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import { PayerSection } from "./PayerSection";
import { ReceiverSection } from "./ReceiverSection";
import { useFieldArray, useFormContext } from "react-hook-form";
import BaseButton from "../reusables/BaseButton";
import { Plus } from "lucide-react";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { SectionContainer } from "./SectionContainer";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReceiptForm = () => {
  const { control } = useFormContext();
  const {
    fields: services,
    append,
    remove,
    move,
  } = useFieldArray({
    control: control,
    name: "detail.services",
  });

  // console.log('fields', fields);
  const addNewField = () => {
    append({
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  return (
    <InvoiceContainer title="Receipt">
      <div className="space-y-1">
        <Label className="!text-label font-medium text-neutral-700">
          Effective Date
        </Label>
        <div className="bg-white text-gray-600">
          <DatePickerFormField name="details.invoiceDate" />
        </div>
      </div>
      <PayerSection />
      <ReceiverSection />

      <SectionContainer title="Services">
        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <FormInput
              key={service.id}
              name={`detail.services.${index}.name`}
            />
          ))}
        </div>

        <BaseButton
          tooltipLabel="Add a new item to the list"
          onClick={addNewField}
          className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
        >
          <Plus />
          Add item
        </BaseButton>
      </SectionContainer>

      <SectionContainer title="Compensation">
        <FormInput
          label="Total Cost of the Services"
          name="detail.cost.total"
          type="number"
        />
        <FormInput
          label="Amount Due at Signing"
          name="detail.cost.paid"
          type="number"
        />
        <FormInput
          label="Amount Due at Completion"
          name="detail.cost.remaining"
          type="number"
        />
      </SectionContainer>

      <SectionContainer title="Payment">
        <FormInput
          label="Frequency of sending invoices"
          name="detail.payment.frequency"
          type="number"
        />
        <FormInput
          label="Invoice payment due date (within ___ days)"
          name="detail.payment.dueDate"
          type="number"
        />
        <FormInput
          label="Payment method"
          name="detail.payment.method"
          type="text"
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Payment methods
          </label>
          <div className="flex flex-wrap gap-4">
            {["Credit Card", "Electronic Transfer", "Check"].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={method}
                  name="detail.payment.methods"
                  value={method}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={method} className="text-sm text-gray-700">
                  {method}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Term Duration
          </label>
          <div className="flex items-center gap-4">
            <FormInput
              name="detail.term.duration"
              type="number"
              className="w-24"
            />

            <Select name="detail.term.unit" defaultValue="days">
              <SelectTrigger className="w-full border border-gray-200 bg-white">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <FormInput
            name="detail.noticePeriod"
            type="number"
            placeholder="Enter number of days"
            label="Number of days notice before termination"
          />
        </div>
        <div className="space-y-2">
          <FormInput
            name="detail.appliedLaw"
            type="text"
            placeholder="Enter number of days"
            label="Applied Law"
          />
        </div>
      </SectionContainer>
      <SectionContainer title="Signature">
        <FormInput
          name="detail.signature.clientDate"
          type="text"
          placeholder="Enter client signature"
        />
        <FormInput
          name="detail.signature.providerDate"
          type="text"
          placeholder="Enter provider signature"
        />
      </SectionContainer>
    </InvoiceContainer>
  );
};
