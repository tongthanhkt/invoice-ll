import React from "react";
import { InvoiceContainer } from "./InvoiceContainer";
import { Label } from "@/components/ui/label";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import { PayerSection } from "./PayerSection";
import { ReceiverSection } from "./ReceiverSection";
import { useFieldArray, useFormContext } from "react-hook-form";
import BaseButton from "../reusables/BaseButton";
import { Plus, Trash2 } from "lucide-react";
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
  const { control, watch, setValue } = useFormContext();
  const {
    fields: services,
    append,
    remove,
    move,
  } = useFieldArray({
    control: control,
    name: "receipt.services",
  });

  const addNewField = () => {
    append({
      name: "",
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
          <DatePickerFormField name="receipt.invoiceDate" />
        </div>
      </div>
      <PayerSection />
      <ReceiverSection />

      <SectionContainer title="Services">
        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <div>
              <FormInput
                key={service.id}
                name={`receipt.services.${index}.name`}
              />
              <BaseButton
                className="p-1 bg-white text-red-500 hover:bg-red-50 size-8"
                variant="destructive"
                onClick={() => removeField(index)}
              >
                <Trash2 className="w-4 h-4" />
              </BaseButton>
            </div>
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
          name="receipt.cost.total"
          type="number"
        />
        <FormInput
          label="Amount Due at Signing"
          name="receipt.cost.paid"
          type="number"
        />
        <FormInput
          label="Amount Due at Completion"
          name="receipt.cost.remaining"
          type="number"
        />
      </SectionContainer>

      <SectionContainer title="Payment">
        <FormInput
          label="Frequency of sending invoices"
          name="receipt.payment.frequency"
          type="number"
        />
        <FormInput
          label="Invoice payment due date (within ___ days)"
          name="receipt.payment.dueDate"
          type="number"
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
                  name="receipt.payment.methods"
                  value={method}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onCheckedChange={(checked) => {
                    const currentMethods =
                      watch("receipt.payment.methods") || [];
                    if (checked) {
                      setValue("receipt.payment.methods", [
                        ...currentMethods,
                        method,
                      ]);
                    } else {
                      setValue(
                        "receipt.payment.methods",
                        currentMethods.filter((m: string) => m !== method)
                      );
                    }
                  }}
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
              name="receipt.term.duration"
              type="number"
              className="w-24"
            />

            <Select
              name="receipt.term.unit"
              defaultValue="days"
              onValueChange={(value) => {
                setValue("receipt.term.unit", value);
              }}
            >
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
            name="receipt.noticePeriod"
            type="number"
            placeholder="Enter number of days"
            label="Number of days notice before termination"
          />
        </div>
        <div className="space-y-2">
          <FormInput
            name="receipt.appliedLaw"
            type="text"
            placeholder="Enter number of days"
            label="Applied Law"
          />
        </div>
      </SectionContainer>
      <SectionContainer title="Signature">
        <FormInput
          name="receipt.signature.clientDate"
          type="text"
          placeholder="Enter client signature"
        />
        <FormInput
          name="receipt.signature.providerDate"
          type="text"
          placeholder="Enter provider signature"
        />
      </SectionContainer>
    </InvoiceContainer>
  );
};
