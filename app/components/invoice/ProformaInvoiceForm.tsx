import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuerySpinner } from "@/hooks/useQuerySpinner";
import { useGetCompanyQuery } from "@/services/companyService";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import DatePickerFormField from "../reusables/form-fields/DatePickerFormField";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import ProformaInvoiceTable from "./form/sections/ProformaInvoiceTable";
import { InvoiceContainer } from "./InvoiceContainer";
import { ReceiverSection } from "./ReceiverSection";
import { SectionContainer } from "./SectionContainer";
import { ShipmentSection } from "./ShipmentSection";

export const ProformaInvoiceForm = () => {
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
    setValue("proforma.freightType", "Air");
  }, [company]);
  return (
    <InvoiceContainer title="Proforma Invoice">
      <div className="space-y-4">
        <SectionContainer title="Details">
          <div className="grid grid-cols-2 gap-4">
            <FormInput name="details.invoiceNumber" label="Invoice Number" />
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Date
              </Label>
              <div className="bg-white text-gray-600 ">
                <DatePickerFormField name="details.invoiceDate" />
              </div>
            </div>
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Expiration Date
              </Label>
              <div className="bg-white text-gray-600 ">
                <DatePickerFormField name="details.dueDate" />
              </div>
            </div>
            <FormInput name="details.customerId" label="Customer ID" />
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
        <ReceiverSection />
        <ShipmentSection />
        <SectionContainer title="Shipping details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="!text-label font-medium text-neutral-700">
                Freight Type
              </Label>
              <Select
                name="proforma.freightType"
                defaultValue="Air"
                onValueChange={(value) => {
                  setValue("proforma.freightType", value);
                }}
              >
                <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Air"
                    className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                  >
                    Air
                  </SelectItem>
                  <SelectItem
                    value="Ocean"
                    className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                  >
                    Ocean
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 !-mt-0">
              <Label className="!text-label font-medium text-neutral-700">
                Est Ship Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="proforma.estShipDate" />
              </div>
            </div>
            <FormInput name="proforma.unitWeight" label="Unit Weight" />
            <FormInput
              name="proforma.grossWeight"
              label="Est Gross Weight"
              type="number"
            />
            <FormInput
              name="proforma.cubicWeight"
              label="Est Cubic Weight"
              type="number"
            />
            <FormInput
              name="proforma.totalPackage"
              label="Total Packages"
              type="number"
            />
          </div>
        </SectionContainer>
        <ProformaInvoiceTable />
        <SectionContainer title="Terms and other comments">
          <FormInput name="details.terms" label="Terms" />
          <FormInput name="details.paymentTerms" label="Payment Terms" />
          <FormInput name="details.deliveryTerms" label="Delivery Terms" />
          <FormInput name="details.comments" label="Comments" />
        </SectionContainer>
        <SectionContainer title="Additional details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput name="additional.country" label="Country" />
            <FormInput
              name="additional.portEmbarkation"
              label="Port of Embarkation"
            />
            <FormInput
              name="additional.portDischarge"
              label="Port of Discharge"
            />
            <FormInput
              name="additional.reasonForExport"
              label="Reason for Export:"
            />
            <FormInput name="additional.typedName" label="Typed Name" />
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Signed date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="details.signedDate" />
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </InvoiceContainer>
  );
};
