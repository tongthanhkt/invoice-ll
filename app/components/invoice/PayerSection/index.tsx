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
import { PayerCombined } from "../InvoiceMain";
import { SectionContainer } from "../SectionContainer";

interface Payer {
  _id: string;
  name: string;
  emails: string[];
  addresses: string[];
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

interface PayerSectionProps {
  payersData?: PayerCombined;
}

export const PayerSection = ({ payersData }: PayerSectionProps) => {
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
      title="Payer Details"
      actionEl={
        <UserInfoModal
          title="Add a new payer"
          description="Add a new payer to your invoice. This information will be saved for future use."
          trigger={
            <BaseButton
              tooltipLabel="Add a new item to the list"
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
            >
              <Plus />
              Add item
            </BaseButton>
          }
        />
      }
    >
      <AppSelect
        label="Payer"
        value={selectedPayer}
        options={(payers as UserInfo[])?.map((payer) => ({
          value: payer.id,
          label: payer.name,
        }))}
        placeholder="Select or create payer"
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
        label="Payer Email"
        placeholder="Enter your payer email"
      />
      <FormInput
        name="payer.address"
        label="Payer Address"
        placeholder="Enter the address of the payer"
      />
    </SectionContainer>
  );
};
