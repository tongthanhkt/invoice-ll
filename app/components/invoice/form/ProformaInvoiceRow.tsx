"use client";

import { BaseButton } from "@/app/components";
import { ItemType } from "@/types";
import { Trash2 } from "lucide-react";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { useFormContext, useWatch } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

type ProformaInvoiceRowProps = {
  name: string;
  index: number;
  fields: ItemType[];
  removeField: (index: number) => void;
};

const ProformaInvoiceRow = ({
  name,
  index,
  fields,
  removeField,
}: ProformaInvoiceRowProps) => {
  const { control, setValue, watch } = useFormContext();

  const rate = useWatch({
    name: `${name}[${index}].unitPrice`,
    control,
  });

  const quantity = useWatch({
    name: `${name}[${index}].quantity`,
    control,
  });

  const total = useWatch({
    name: `${name}[${index}].total`,
    control,
  });

  useEffect(() => {
    // Calculate total when rate or quantity changes
    if (rate != undefined && quantity != undefined) {
      const calculatedTotal = (rate * quantity).toFixed(2);

      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [rate, quantity]);

  return (
    <div>
      <div className=" flex flex-col gap-3 p-3 border border-neutral-200 rounded-lg mb-2">
        <div className="flex justify-between items-center">
          <div className="font-medium text-neutral-700">#{index + 1}</div>
          <div className="flex items-center gap-1">
            {fields.length > 0 && (
              <BaseButton
                className="p-1 bg-white text-red-500 hover:bg-red-50 size-10"
                variant="destructive"
                onClick={() => removeField(index)}
              >
                <Trash2 className="w-4 h-4" />
              </BaseButton>
            )}
          </div>
        </div>

        <div className="w-full mb-3">
          <FormInput
            name={`${name}[${index}].description`}
            placeholder="Description"
            label="Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <FormInput
            name={`${name}[${index}].unit`}
            placeholder="Unit"
            label="Unit of Measure"
          />
          <FormInput
            name={`${name}[${index}].partNumber`}
            placeholder="Part Number"
            label="Part Number"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-2  items-center">
          <FormInput
            name={`${name}[${index}].quantity`}
            placeholder="Quantity"
            label="Quantity"
          />
          <FormInput
            name={`${name}[${index}].unitPrice`}
            placeholder="Unit Price"
            label="Unit Price"
            type="number"
          />
          <div className="flex items-center gap-2 h-full mt-6 mx-auto">
            <Label
              htmlFor={`${name}[${index}].taxable`}
              className="!text-label font-medium text-neutral-700"
            >
              Taxable
            </Label>
            <Checkbox
              id={`${name}[${index}].taxable`}
              name={`${name}[${index}].taxable`}
              checked={watch(`${name}[${index}].taxable`)}
              onCheckedChange={(checked) => {
                setValue(`${name}[${index}].taxable`, checked);
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <FormInput
            label="Total amount"
            name={`${name}[${index}].total`}
            placeholder="Total amount"
            type="number"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ProformaInvoiceRow;
