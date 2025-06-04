import { Label } from "@/components/ui/label";
import { DatePickerFormField } from "..";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { InvoiceContainer } from "./InvoiceContainer";
import { SectionContainer } from "./SectionContainer";
import { ShipmentSection } from "./ShipmentSection";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCompanyQuery } from "@/services";
import { useQuerySpinner } from "@/hooks";
import { useEffect } from "react";
import DeliveryReceiptItems from "./form/sections/DeliveryReceiptItems";

export const DeliveryReceiptForm = () => {
  const { data: company } = useQuerySpinner(useGetCompanyQuery());

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (company) {
      setValue("company.name", company.name);
      setValue("company.email", company.email);
    }
  }, [company]);

  return (
    <InvoiceContainer title="Delivery Receipt">
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Date
                </Label>
                <div className="bg-white text-gray-600 ">
                  <DatePickerFormField name="receipt.date" />
                </div>
              </div>
              <div className="space-y-1 -mt-2">
                <Label className="!text-label font-medium text-neutral-700">
                  Delivery method
                </Label>
                <Select
                  name="shipment.method"
                  defaultValue="Standard Shipping"
                  onValueChange={(value) => {
                    setValue("shipment.method", value);
                  }}
                >
                  <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Standard Shipping"
                      className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                    >
                      Standard Shipping
                    </SelectItem>
                    <SelectItem
                      value="Express Shipping"
                      className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                    >
                      Express Shipping
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="company.name" label="Delivery by" />
              <FormInput name="company.email" label="Email" />
            </div>
          </div>
        </SectionContainer>
        <ShipmentSection
          title="Shipment Details"
          hideCompanyName
          hidePhoneNumber
        />
        <DeliveryReceiptItems />
      </div>
    </InvoiceContainer>
  );
};
