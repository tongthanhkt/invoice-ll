import { useQuerySpinner } from "@/hooks";
import { useGetShipmentTemplatesQuery } from "@/services/shipmentService";
import { ShipmentTemplate } from "@/types/shipment";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseButton from "../../reusables/BaseButton";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { ShipmentModal } from "../../reusables/ShipmentModal";
import { SectionContainer } from "../SectionContainer";

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export const ShipmentSection = ({
  title,
  label,
  hideCompanyName = false,
  hidePhoneNumber = false,
}: {
  title?: string;
  label?: { name?: string; email?: string; address?: string; addBtn?: string };
  hideCompanyName?: boolean;
  hidePhoneNumber?: boolean;
}) => {
  const methods = useFormContext();
  const { setValue } = methods;

  const { data: shipments } = useQuerySpinner(useGetShipmentTemplatesQuery(""));

  // Initialize select options
  const [selectedReceiver, setSelectedReceiver] = useState<SelectOption | null>(
    null
  );

  return (
    <SectionContainer
      title={title || "Shipment"}
      actionEl={
        <ShipmentModal
          title={`Add a new shipment`}
          description={`Add a new shipment to your invoice. This information will be saved for future use.`}
          trigger={
            <BaseButton
              tooltipLabel={`Add a new shipment to the list`}
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
            >
              <Plus />
              {label?.addBtn || "Add shipment"}
            </BaseButton>
          }
        />
      }
    >
      <div className="flex flex-col space-y-4">
        <AppSelect
          label={label?.name || "Name"}
          value={selectedReceiver}
          options={shipments?.map((shipment: ShipmentTemplate) => ({
            value: shipment.id,
            label: shipment.name,
          }))}
          placeholder={`Select or create ${
            label?.name?.toLowerCase() || "receiver"
          }`}
          onChange={(option: any) => {
            setSelectedReceiver(option);
            if (!option) {
              setValue("shipment.name", "");
              setValue("shipment.address", "");
              setValue("shipment.phone_number", "");
              setValue("shipment.company_name", "");
            } else {
              setValue("shipment.name", option.label);
              const curShipment = (shipments as ShipmentTemplate[]).find(
                (shipment) => shipment.id === option.value
              );
              setValue("shipment.address", curShipment?.address || "");
              setValue(
                "shipment.phone_number",
                curShipment?.phone_number || ""
              );
              setValue(
                "shipment.company_name",
                curShipment?.company_name || ""
              );
            }
          }}
          isSearchable={true}
          isClearable={true}
        />
        {!hideCompanyName && (
          <FormInput
            name="shipment.company_name"
            label={"Company Name"}
            placeholder={`Enter the company name`}
          />
        )}
        {!hidePhoneNumber && (
          <FormInput
            name="shipment.phone_number"
            label={"Phone Number"}
            placeholder={`Enter the phone number`}
          />
        )}
        <FormInput
          name="shipment.address"
          label={label?.address || "Address"}
          placeholder={`Enter the ${
            label?.address?.toLowerCase() || "receiver address"
          }`}
        />
      </div>
    </SectionContainer>
  );
};
