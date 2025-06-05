import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { DatePickerFormField, Items } from "..";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { InvoiceContainer } from "./InvoiceContainer";
import { ProviderSection } from "./ProviderSection";
import { SectionContainer } from "./SectionContainer";
import { ReceiverSection } from "./ReceiverSection";

export const SaleContractForm = () => {
  const { setValue } = useFormContext();
  return (
    <InvoiceContainer title="Sale Contract">
      <div className="space-y-4">
        <ProviderSection />
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
        <SectionContainer title="Details">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 ">
            <div className="space-y-1 -mt-[6px]">
              <Label className="!text-label font-medium text-neutral-700">
                Agreement Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="saleContract.invoiceDate" />
              </div>
            </div>
            <FormInput name="saleContract.governingLaw" label="Governing Law" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput
              name="saleContract.paymentDueDays"
              label="Total Amount"
              type="number"
            />
            <FormInput
              name="saleContract.lateFeePercent"
              label="Late Fee Percent"
              type="number"
            />
          </div>
          <FormInput
            name="saleContract.terminationNoticeDays"
            label="Notice Period (days)"
            type="number"
          />
        </SectionContainer>
        <Items hideTax title="Items" />
        <SectionContainer title="Shipment Details">
          <FormInput name="shipment.address" label="Shipment Address" />
          <div className="space-y-1 ">
            <Label className="!text-label font-medium text-neutral-700">
              Shipping method decided by
            </Label>
            <Select
              name="saleContract.shippingMethodDecidedBy"
              defaultValue="Seller"
              onValueChange={(value) => {
                setValue("saleContract.shippingMethodDecidedBy", value);
              }}
            >
              <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                <SelectValue placeholder="Select shipping method decided by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Seller"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Seller
                </SelectItem>
                <SelectItem
                  value="Customer"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Customer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="!text-label font-medium text-neutral-700">
              Shipping Cost Responsibility
            </Label>
            <Select
              name="saleContract.shippingCostResponsibility"
              defaultValue="Seller"
              onValueChange={(value) => {
                setValue("saleContract.shippingCostResponsibility", value);
              }}
            >
              <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                <SelectValue placeholder="Select shipping cost responsibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Seller"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Seller
                </SelectItem>
                <SelectItem
                  value="Customer"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Customer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SectionContainer>
        {/* Signature Section */}
        <SectionContainer title="Signatures">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Customer Signature Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="saleContract.signature.customerDate" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Provider Signature Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="saleContract.signature.providerDate" />
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </InvoiceContainer>
  );
};
