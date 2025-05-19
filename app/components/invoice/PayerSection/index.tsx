import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import { PayerCombined } from "../InvoiceMain";
import { SectionContainer } from "../SectionContainer";
import {
  useCreatePayerAddressMutation,
  useCreatePayerEmailMutation,
  useCreatePayerMutation,
} from "@/services";
import { spinnerService } from "@/services/spinner.service";

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

  // Initialize with data from props
  const [createPayer] = useCreatePayerMutation();
  const [createPayerEmail] = useCreatePayerEmailMutation();
  const [createPayerAddress] = useCreatePayerAddressMutation();

  const payerEmails = useMemo(() => {
    return payersData?.emails.map((email) => ({
      value: email.email,
      label: email.email,
    }));
  }, [payersData?.emails]);

  const payerAddresses = useMemo(() => {
    return payersData?.addresses.map((address) => ({
      value: address.address,
      label: address.address,
    }));
  }, [payersData?.addresses]);

  // Initialize select options
  const [selectedPayer, setSelectedPayer] = useState<SelectOption | null>(null);
  const [selectedPayerEmail, setSelectedPayerEmail] =
    useState<SelectOption | null>(null);
  const [selectedPayerAddress, setSelectedPayerAddress] =
    useState<SelectOption | null>(null);

  return (
    <SectionContainer title="Payer Details">
      <AppSelect
        label="Payer"
        value={selectedPayer}
        options={payersData?.payers.map((payer: Payer) => ({
          value: payer._id,
          label: payer.name,
        }))}
        placeholder="Select or create payer"
        onChange={(option: any) => {
          setSelectedPayer(option);
          if (!option) {
            setValue("payer.name", "");
          } else if (option?.__isNew__) {
            setValue("payer.name", option.label);
          } else {
            setValue("payer.name", option.label);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const newPayer = await spinnerService.executePromises(
              createPayer({ name: inputValue })
            );

            const { id = "", name = "" } = newPayer.data || {};

            if (!id || !name) {
              throw new Error("Failed to create payer");
            }

            setSelectedPayer({
              value: id,
              label: name,
            });
            setValue("payer.name", name);
            return {
              value: id,
              label: name,
            };
          } catch (error) {
            console.error("Error creating payer:", error);
            return null;
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
      <AppSelect
        label="Payer Email"
        value={selectedPayerEmail}
        options={payerEmails}
        placeholder="Select or create email"
        onChange={(option: any) => {
          setSelectedPayerEmail(option);
          if (!option) {
            setValue("payer.email", "");
          } else if (option?.__isNew__) {
            setValue("payer.email", option.label);
          } else {
            setValue("payer.email", option.value);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const response = await spinnerService.executePromises(
              createPayerEmail({ email: inputValue })
            );

            if (!response) {
              throw new Error("Failed to create payer email");
            }

            const { email = "" } = response.data || {};

            setSelectedPayerEmail({
              value: email,
              label: email,
            });
            setValue("payer.email", email);
            return {
              value: email,
              label: email,
            };
          } catch (error) {
            console.error("Error creating payer email:", error);
            return null;
          }
        }}
        // className="w-full bg-white text-gray-900"
        // classNames={{
        //   control: () => 'border border-gray-200 h-10 px-3 rounded-md',
        //   input: () => 'text-sm',
        //   menu: () => 'bg-white mt-1 border border-gray-200 rounded-md',
        //   option: () => `text-gray-900 px-3 py-2 hover:bg-gray-100`,
        // }}
        isSearchable={true}
        isClearable={true}
      />
      <AppSelect
        label="Payer Address"
        value={selectedPayerAddress}
        options={payerAddresses}
        placeholder="Select or create address"
        onChange={(option: any) => {
          setSelectedPayerAddress(option);
          if (!option) {
            setValue("payer.address", "");
          } else if (option?.__isNew__) {
            setValue("payer.address", option.label);
          } else {
            setValue("payer.address", option.value);
          }
        }}
        onCreateOption={async (inputValue: string) => {
          try {
            const response = await spinnerService.executePromises(
              createPayerAddress({ address: inputValue })
            );

            if (!response) {
              throw new Error("Failed to create payer address");
            }

            const { address = "" } = response.data || {};

            setSelectedPayerAddress({
              value: address,
              label: address,
            });
            setValue("payer.address", address);
            return {
              value: address,
              label: address,
            };
          } catch (error) {
            console.error("Error creating payer address:", error);
            return null;
          }
        }}
        isSearchable={true}
        isClearable={true}
      />
    </SectionContainer>
  );
};
