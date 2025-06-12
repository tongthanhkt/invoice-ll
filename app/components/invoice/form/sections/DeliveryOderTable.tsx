"use client";

import { useCallback, useState } from "react";

// RHF
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

// DnD
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { Plus } from "lucide-react";

// Types
import { InvoiceType, ItemType } from "@/types";
import DeliveryOrderRow from "../DeliveryOrderRow";

const DeliveryOderTable = () => {
  const { control } = useFormContext<InvoiceType>();

  const ITEMS_NAME = "details.items";
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: ITEMS_NAME,
  });

  const formValues = useWatch({
    control,
    name: ITEMS_NAME,
  });

  const totalQuantity =
    formValues?.reduce(
      (acc: number, curr: ItemType) => acc + Number(curr.quantity || 0),
      0
    ) || 0;

  const addNewField = () => {
    append({
      no: "",
      name: "",
      unitPrice: 0,
      quantity: 0,
      total: 0,
      weightInUnit: 0,
      measurement: "",
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 ">
            Packing List Details
          </h3>
        </div>

        <div>
          {fields?.length ? (
            fields.map((field, index) => (
              <DeliveryOrderRow
                key={field.id}
                name={ITEMS_NAME}
                index={index}
                fields={fields}
                removeField={removeField}
              />
            ))
          ) : (
            <div className="text-neutral-500 text-center py-4 text-sm">
              No data
            </div>
          )}
        </div>

        <BaseButton
          tooltipLabel="Add a new item to the list"
          onClick={addNewField}
          className="bg-white rounded-lg text-blue-500 hover:bg-blue-50 border-0 py-0 h-9 w-fit ml-auto flex items-center gap-2 -mr-2"
        >
          <Plus />
          Add item
        </BaseButton>
      </section>
      <section className="space-y-4 mt-4">
        <div className="flex flex-col items-end w-full sm:w-auto border-t border-neutral-200">
          <div className="w-full sm:w-[300px] p-2 px-4 space-y-1">
            <div className="flex justify-between w-full text-base">
              <span className="text-sm text-gray-500 font-medium">
                Total Quantity
              </span>
              <span className="font-semibold text-gray-700">
                {totalQuantity || 0}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeliveryOderTable;
