import { useQuerySpinner } from "@/hooks";
import { useGetProvidersQuery } from "@/services/providerService";
import { Provider } from "@/types/provider";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseButton from "../../reusables/BaseButton";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { ProviderModal } from "../../reusables/ProviderModal";
import { SectionContainer } from "../SectionContainer";

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

type ProviderSectionProps = {
  title?: string;
  label?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    addBtn?: string;
  };
};

export const ProviderSection = ({
  title = "Provider Details",
  label = {
    name: "Provider",
    email: "Provider Email",
    phone: "Provider Phone",
    address: "Provider Address",
    addBtn: "Add Provider",
  },
}: ProviderSectionProps) => {
  const methods = useFormContext();
  const { setValue } = methods;

  const { data: providers } = useQuerySpinner(useGetProvidersQuery(""));
  const initialized = useRef(false);

  useEffect(() => {
    if (providers && Array.isArray(providers) && !initialized.current) {
      const defaultProvider = providers[0]; // Get first provider as default
      if (defaultProvider) {
        setSelectedProvider({
          value: defaultProvider.id,
          label: defaultProvider.name,
        });
        setValue("provider.name", defaultProvider.name);
        setValue("provider.email", defaultProvider.email || "");
        setValue("provider.phone_number", defaultProvider.phone_number || "");
        setValue("provider.address", defaultProvider.address || "");
      }
      initialized.current = true;
    }
  }, [providers, setValue]);

  // Initialize select options
  const [selectedProvider, setSelectedProvider] = useState<SelectOption | null>(
    null
  );

  return (
    <SectionContainer
      title={title}
      actionEl={
        <ProviderModal
          title={`Add a new ${label.name?.toLowerCase() || "provider"}`}
          description={`Add a new ${
            label.name?.toLowerCase() || "provider"
          } to your invoice. This information will be saved for future use.`}
          trigger={
            <BaseButton
              tooltipLabel={`Add a new ${
                label.name?.toLowerCase() || "provider"
              } to the list`}
              className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
            >
              <Plus />
              {label.addBtn || "Add provider"}
            </BaseButton>
          }
          angel={label.name}
        />
      }
    >
      <AppSelect
        label={label.name || "Provider"}
        value={selectedProvider}
        options={(providers as Provider[])?.map((provider) => ({
          value: provider.id,
          label: provider.name,
        }))}
        placeholder={`Select or create ${
          label.name?.toLowerCase() || "provider"
        }`}
        onChange={(option: any) => {
          setSelectedProvider(option);
          if (!option) {
            setValue("provider.name", "");
            setValue("provider.email", "");
            setValue("provider.phone_number", "");
            setValue("provider.address", "");
          } else {
            setValue("provider.name", option.label);
            const curProvider = (providers as Provider[]).find(
              (provider) => provider.id === option.value
            );
            setValue("provider.email", curProvider?.email || "");
            setValue("provider.phone_number", curProvider?.phone_number || "");
            setValue("provider.address", curProvider?.address || "");
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
      <FormInput
        name="provider.email"
        label={label.email || "Provider Email"}
        placeholder={`Enter your ${
          label.email?.toLowerCase() || "provider email"
        }`}
      />
      <FormInput
        name="provider.phone_number"
        label={label.phone || "Provider Phone"}
        placeholder={`Enter your ${
          label.phone?.toLowerCase() || "provider phone"
        }`}
      />
      <FormInput
        name="provider.address"
        label={label.address || "Provider Address"}
        placeholder={`Enter the ${
          label.address?.toLowerCase() || "provider address"
        }`}
      />
    </SectionContainer>
  );
};
