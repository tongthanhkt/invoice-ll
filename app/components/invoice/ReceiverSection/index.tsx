import { useQuerySpinner } from "@/hooks";
import { useGetClientInfoTemplatesQuery } from "@/services/clientInfoService";
import { ClientInfoTemplate } from "@/types/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseButton from "../../reusables/BaseButton";
import { ClientModalInfo } from "../../reusables/ClientModalInfo";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { SectionContainer } from "../SectionContainer";

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export const ReceiverSection = ({
  title,
  label,
}: {
  title?: string;
  label?: { name?: string; email?: string; address?: string; addBtn?: string };
}) => {
  const methods = useFormContext();
  const { setValue } = methods;

  const { data: receivers } = useQuerySpinner(
    useGetClientInfoTemplatesQuery("")
  );

  // Initialize select options
  const [selectedReceiver, setSelectedReceiver] = useState<SelectOption | null>(
    null
  );

  return (
    <SectionContainer
      title={title || "Receiver Details"}
      actionEl={
        <ClientModalInfo
          title={`Add a new ${label?.name?.toLowerCase() || "receiver"}`}
          description={`Add a new ${
            label?.name?.toLowerCase() || "receiver"
          } to your invoice. This information will be saved for future use.`}
          trigger={
            <BaseButton
              tooltipLabel={`Add a new ${
                label?.name?.toLowerCase() || "receiver"
              } to the list`}
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
            >
              <Plus />
              {label?.addBtn || "Add receiver"}
            </BaseButton>
          }
          angel={label?.name}
        />
      }
    >
      <div className="flex flex-col space-y-4">
        <AppSelect
          label={label?.name || "Receiver"}
          value={selectedReceiver}
          options={receivers?.map((receiver: ClientInfoTemplate) => ({
            value: receiver.id,
            label: receiver.name,
          }))}
          placeholder={`Select or create ${
            label?.name?.toLowerCase() || "receiver"
          }`}
          onChange={(option: any) => {
            setSelectedReceiver(option);
            if (!option) {
              setValue("receiver.name", "");
              setValue("receiver.email", "");
              setValue("receiver.address", "");
            } else {
              setValue("receiver.name", option.label);
              const curReceiver = (receivers as ClientInfoTemplate[]).find(
                (receiver) => receiver.id === option.value
              );
              setValue("receiver.email", curReceiver?.email || "");
              setValue("receiver.address", curReceiver?.address || "");
            }
          }}
          isSearchable={true}
          isClearable={true}
        />

        <FormInput
          name="receiver.email"
          label={label?.email || "Receiver Email"}
          placeholder={`Enter the email`}
        />
        <FormInput
          name="receiver.address"
          label={label?.address || "Receiver Address"}
          placeholder={`Enter the address`}
        />
      </div>
    </SectionContainer>
  );
};
