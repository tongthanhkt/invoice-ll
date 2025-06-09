import { useQuerySpinner } from "@/hooks";
import { useGetUserInfoTemplatesQuery } from "@/services";
import { UserInfo } from "@/types/useInfo";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseButton from "../../reusables/BaseButton";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { UserInfoModal } from "../../reusables/UserInfoModal";
import { SectionContainer } from "../SectionContainer";

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

type PayerSectionProps = {
  title?: string;
  label?: {
    name?: string;
    email?: string;
    address?: string;
    addBtn?: string;
  };
  formIndexes?: {
    name?: number;
    email?: number;
    address?: number;
  };
};
export const PayerSection = ({
  title = "Payer Details",
  label = {
    name: "Payer",
    email: "Payer Email",
    address: "Payer Address",
    addBtn: "Add Payer",
  },
  formIndexes,
}: PayerSectionProps) => {
  const methods = useFormContext();
  const { setValue } = methods;

  const { data: payers } = useQuerySpinner(useGetUserInfoTemplatesQuery(""));
  const initialized = useRef(false);

  useEffect(() => {
    if (payers && Array.isArray(payers) && !initialized.current) {
      const defaultPayer = payers.find((payer) => payer.isDefault);
      if (defaultPayer) {
        setSelectedPayer({
          value: defaultPayer.id,
          label: defaultPayer.name,
        });
        setValue("payer.name", defaultPayer.name);
        setValue("payer.email", defaultPayer.email || "");
        setValue("payer.address", defaultPayer.address || "");
      }
      initialized.current = true;
    }
  }, [payers, setValue]);

  // Initialize select options
  const [selectedPayer, setSelectedPayer] = useState<SelectOption | null>(null);

  return (
    <SectionContainer
      title={title}
      actionEl={
        <UserInfoModal
          title={`Add a new ${label.name?.toLowerCase() || "payer"}`}
          description={`Add a new ${
            label.name?.toLowerCase() || "payer"
          } to your invoice. This information will be saved for future use.`}
          trigger={
            <BaseButton
              tooltipLabel={`Add a new ${
                label.name?.toLowerCase() || "payer"
              } to the list`}
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
            >
              <Plus />
              {label.addBtn || "Add payer"}
            </BaseButton>
          }
          angel={label.name}
        />
      }
    >
      <AppSelect
        label={label.name || "Payer"}
        formIndex={formIndexes?.name}
        value={selectedPayer}
        options={(payers as UserInfo[])?.map((payer) => ({
          value: payer.id,
          label: payer.name,
        }))}
        placeholder={`Select or create ${label.name?.toLowerCase() || "payer"}`}
        onChange={(option: any) => {
          setSelectedPayer(option);
          if (!option) {
            setValue("payer.name", "");
            setValue("payer.email", "");
            setValue("payer.address", "");
          } else {
            setValue("payer.name", option.label);
            const curPayer = (payers as UserInfo[]).find(
              (payer) => payer.id === option.value
            );
            setValue("payer.email", curPayer?.email || "");
            setValue("payer.address", curPayer?.address || "");
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
      <FormInput
        name="payer.email"
        label={label.email || "Payer Email"}
        formIndex={formIndexes?.email}
        placeholder={`Enter your ${
          label.email?.toLowerCase() || "payer email"
        }`}
      />
      <FormInput
        name="payer.address"
        label={label.address || "Payer Address"}
        formIndex={formIndexes?.address}
        placeholder={`Enter the ${
          label.address?.toLowerCase() || "payer address"
        }`}
      />
    </SectionContainer>
  );
};
