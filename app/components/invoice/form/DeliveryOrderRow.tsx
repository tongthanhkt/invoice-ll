"use client";

import { BaseButton } from "@/app/components";
import { ItemType } from "@/types";
import { Trash2 } from "lucide-react";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { useFormContext } from "react-hook-form";

type DeliveryOrderRowProps = {
  name: string;
  index: number;
  fields: ItemType[];
  removeField: (index: number) => void;
};

const DeliveryOrderRow = ({
  name,
  index,
  fields,
  removeField,
}: DeliveryOrderRowProps) => {
  const { control } = useFormContext();

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

        <div className="w-full mb-3 ">
          <FormInput
            name={`${name}[${index}].name`}
            placeholder="Description of Goods"
            vertical
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <FormInput
              name={`${name}[${index}].no`}
              type="number"
              placeholder="No."
              label="No."
              size={10}
            />
          </div>

          <div>
            <FormInput
              name={`${name}[${index}].quantity`}
              type="number"
              placeholder="Item quantity"
              label="Quantity"
              size={10}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <FormInput
              name={`${name}[${index}].unit`}
              placeholder="Unit"
              label="Unit"
              size={10}
            />
          </div>
          <FormInput
            label="Weight in Unit"
            type="number"
            name={`${name}[${index}].weightInUnit`}
            placeholder="Weight in Unit"
            size={10}
          />
        </div>

        <div className="w-full">
          <FormInput
            label="Measurement"
            name={`${name}[${index}].measurement`}
            placeholder="Measurement"
            size={10}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrderRow;
