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
  } = useFieldArray({
    control: control,
    name: "serviceAgreement.services",
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
    <InvoiceContainer title="Service Agreement">
      <div className="space-y-4">
        {/* Date Section */}
        <SectionContainer title="Details">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Agreement Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="serviceAgreement.invoiceDate" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Contract Duration
              </Label>
              <div className="flex items-center gap-4">
                <FormInput
                  name="serviceAgreement.term.duration"
                  type="number"
                  className="w-24"
                  placeholder="Duration"
                />
                <Select
                  name="serviceAgreement.term.unit"
                  defaultValue="days"
                  onValueChange={(value) => {
                    setValue("serviceAgreement.term.unit", value);
                  }}
                >
                  <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                    <SelectValue placeholder="Select time unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="days"
                      className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                    >
                      Days
                    </SelectItem>
                    <SelectItem
                      value="months"
                      className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                    >
                      Months
                    </SelectItem>
                    <SelectItem
                      value="years"
                      className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                    >
                      Years
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Payer Details */}
        <PayerSection
          title="Provider Details"
          label={{
            name: "Provider",
            email: "Provider Email",
            address: "Provider Address",
            addBtn: "Add Provider",
          }}
        />

        {/* Receiver Details */}
        <ReceiverSection
          title="Customer Details"
          label={{
            name: "Customer",
            email: "Customer Email",
            address: "Customer Address",
            addBtn: "Add Customer",
          }}
        />

        {/* Services Section */}
        <SectionContainer
          title="Services"
          actionEl={
            <BaseButton
              tooltipLabel="Add a new service to the list"
              onClick={addNewField}
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 mt-4"
            >
              <Plus />
              Add Service
            </BaseButton>
          }
        >
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id} className="flex items-center gap-2">
                <FormInput
                  name={`serviceAgreement.services.${index}.name`}
                  className="flex-1"
                  placeholder="Enter service description"
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
            {services.length === 0 && (
              <p className="text-gray-500 text-label text-center">
                No services added yet.
              </p>
            )}
          </div>
        </SectionContainer>

        {/* Compensation Section */}
        <SectionContainer title="Compensation">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="Total"
              name="serviceAgreement.cost.total"
              type="number"
              defaultValue="0"
            />
            <FormInput
              label="Initial Payment"
              name="serviceAgreement.cost.paid"
              type="number"
              defaultValue="0"
            />
            <FormInput
              label="Remaining"
              name="serviceAgreement.cost.remaining"
              type="number"
              defaultValue="0"
            />
          </div>
        </SectionContainer>

        {/* Payment Section */}
        <SectionContainer title="Payment Terms">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Billing Frequency "
                name="serviceAgreement.payment.frequency"
                type="number"
                placeholder="Billing frequency (in days)"
              />
              <FormInput
                label="Due Period"
                name="serviceAgreement.payment.dueDate"
                type="number"
                placeholder="Due period (in days)"
              />
            </div>

            <div className="space-y-2">
              <Label className="!text-label font-medium text-neutral-700">
                Accepted Payment Methods
              </Label>
              <div className="flex flex-wrap gap-4">
                {["Credit Card", "Electronic Transfer", "Check"].map(
                  (method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={method}
                        name="serviceAgreement.payment.methods"
                        value={method}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 "
                        onCheckedChange={(checked) => {
                          const currentMethods =
                            watch("serviceAgreement.payment.methods") || [];
                          if (checked) {
                            setValue("serviceAgreement.payment.methods", [
                              ...currentMethods,
                              method,
                            ]);
                          } else {
                            setValue(
                              "serviceAgreement.payment.methods",
                              currentMethods.filter((m: string) => m !== method)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={method}
                        className="text-label text-gray-700"
                      >
                        {method}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                name="serviceAgreement.noticePeriod"
                type="number"
                placeholder="Enter number of days"
                label="Termination Notice Period"
              />
              <FormInput
                name="serviceAgreement.appliedLaw"
                type="text"
                placeholder="Enter governing law"
                label="Governing Law"
              />
            </div>
          </div>
        </SectionContainer>

        {/* Signature Section */}
        <SectionContainer title="Signatures">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Client Signature Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="serviceAgreement.signature.clientDate" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Provider Signature Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="serviceAgreement.signature.providerDate" />
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </InvoiceContainer>
  );
};
