import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { DatePickerFormField } from "..";
import FormInput from "../reusables/form-fields/FormInput/FormInput";
import { InvoiceContainer } from "./InvoiceContainer";
import { PayerSection } from "./PayerSection";
import { ProviderSection } from "./ProviderSection";
import { SectionContainer } from "./SectionContainer";

export const AcceptanceReport = () => {
  const { setValue } = useFormContext();
  return (
    <InvoiceContainer title="Acceptance Report">
      <div className="space-y-4">
        <SectionContainer title="Details">
          <FormInput name="acceptance.programName" label="Programing Name" />
          <FormInput name="acceptance.address" label="Location" />
          <div className="space-y-1 !-mt-0">
            <Label className="!text-label font-medium text-neutral-700">
              Date
            </Label>
            <div className="bg-white text-gray-600">
              <DatePickerFormField name="details.invoiceDate" />
            </div>
          </div>
        </SectionContainer>
        <PayerSection />
        <ProviderSection />

        <SectionContainer title="Deal details">
          <FormInput
            name="acceptance.content"
            label="Subject of the agreement"
          />
          <FormInput name="acceptance.projectName" label="Project Name" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="acceptance.agreementNumber"
              type="number"
              label="Agreement Number"
            />{" "}
            <div className="space-y-1 -mt-2">
              <Label className="!text-label font-medium text-neutral-700">
                Acceptance Date
              </Label>
              <div className="bg-white text-gray-600">
                <DatePickerFormField name="acceptance.acceptanceDate" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="acceptance.contractClauseReference"
              label="Contract Clause Reference"
            />
            <FormInput
              name="acceptance.clauseNumber"
              label="Applicable Clause Number"
              type="number"
            />
          </div>
        </SectionContainer>
        <SectionContainer title="Acceptance Details">
          <div className="space-y-1 ">
            <Label className="!text-label font-medium text-neutral-700">
              Has the agreement been performed within the set time limit?
            </Label>
            {/* <Select
              name="acceptance.agreementPerformWithinTime"
              defaultValue="has been"
              onValueChange={(value) => {
                setValue("acceptance.agreementPerformWithinTime", value);
              }}
            >
              <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="has been"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Yes, it has been performed within the time limit
                </SelectItem>
                <SelectItem
                  value="has not been"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  No, it has not been performed within the time limit
                </SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* <div className="space-y-1 ">
            <Label className="!text-label font-medium text-neutral-700">
              Has the agreement been performed in accordance with the subject of
              the agreement?
            </Label>
            <Select
              name="acceptance.agreementPerformWithinTime"
              defaultValue="has been"
              onValueChange={(value) => {
                setValue("acceptance.agreementPerformWithinTime", value);
              }}
            >
              <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="has been"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Yes, it has been performed in accordance
                </SelectItem>
                <SelectItem
                  value="has not been"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  No, it has not been performed in accordance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 ">
            <Label className="!text-label font-medium text-neutral-700">
              Are there grounds for payment of the remuneration specified in
              §... of the Agreement?
            </Label>
            <Select
              name="acceptance.groundsForPayment"
              defaultValue="grounds"
              onValueChange={(value) => {
                setValue("acceptance.groundsForPayment", value);
              }}
            >
              <SelectTrigger className="w-full bg-white text-label border border-solid h-9 border-neutral-300 rounded-lg hover:border-blue-400 outline-0 focus:ring-0 focus:ring-offset-0 text-neutral-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="grounds"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label  transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  Yes, there are grounds
                </SelectItem>
                <SelectItem
                  value="no grounds"
                  className="text-gray-700 hover:text-gray-900 px-3 sm:px-4 !py-1 hover:bg-gray-50 rounded-lg hover:cursor-pointer my-1 text-label transition-all duration-150 data-[state=checked]:!bg-blue-100 data-[state=checked]:!text-blue-600 data-[state=checked]:hover:text-blue-600 data-[state=checked]:hover:bg-blue-100  data-[highlighted]:!bg-blue-50 data-[highlighted]:shadow-sm !pl-7"
                >
                  No, there are no grounds
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <FormInput
            name="acceptance.termsOfPayment"
            label="Payment terms in the contract"
          />
        </SectionContainer>
      </div>
    </InvoiceContainer>
  );
};
