"use client";

import { useCallback, useState } from "react";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

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
import { BaseButton, SingleItem } from "@/app/components";

// Icons
import { Plus } from "lucide-react";

// Types
import { InvoiceType } from "@/types";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { formatNumberWithCommas } from "@/lib/helpers";

const QuotationItems = () => {
  const { control, setValue, watch } = useFormContext<InvoiceType>();

  const ITEMS_NAME = "details.items";
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: ITEMS_NAME,
  });

  // console.log('fields', fields);
  const addNewField = () => {
    append({
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const moveFieldUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };
  const moveFieldDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  // DnD
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(active.id);

      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over?.id);

        move(oldIndex, newIndex);
      }
    },
    [fields, setValue]
  );

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 ">
            Quotation Items
          </h3>
        </div>
        <div className="hidden md:flex flex-row items-center px-2 font-medium text-neutral-700 w-full gap-3 bg-neutral-100 py-3 rounded-t-lg border border-b-0 border-solid border-neutral-200 text-label">
          <div className="w-10">No.</div>
          <div className="w-1/2">Description</div>
          <div className="w-1/4 min-w-[60px]">Unit Price</div>
          <div className="w-full max-w-[60px]">Quantity</div>
          <div className="w-1/4">Total</div>
          <div className="max-w-[32px] w-full"></div>
        </div>

        {/* Mobile view for items */}
        <div className="md:hidden">
          {fields?.length ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                const { active } = event;
                setActiveId(active.id);
              }}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SingleItem
                    key={field.id}
                    name={ITEMS_NAME}
                    index={index}
                    fields={fields}
                    field={field}
                    moveFieldUp={moveFieldUp}
                    moveFieldDown={moveFieldDown}
                    removeField={removeField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-neutral-500 text-center py-4 text-sm">
              No data
            </div>
          )}
          <div className="md:hidden flex flex-col items-start justify-end px-3 py-3 gap-3 border border-neutral-200 rounded-lg">
            <div className="w-full flex items-center justify-between">
              <div className="w-full font-medium mb-2">Discount(%)</div>
              <div className="w-full">
                <FormInput
                  name="details.discountDetails.amount"
                  type="number"
                  placeholder="Discount percent"
                  vertical
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop view with border container */}
        <div className="hidden md:block border border-solid rounded-lg md:rounded-t-none md:border-t-0 border-neutral-200 py-2 md:-mt-4">
          {fields?.length ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                const { active } = event;
                setActiveId(active.id);
              }}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SingleItem
                    key={field.id}
                    name={ITEMS_NAME}
                    index={index}
                    fields={fields}
                    field={field}
                    moveFieldUp={moveFieldUp}
                    moveFieldDown={moveFieldDown}
                    removeField={removeField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-neutral-500 text-center py-4 text-sm">
              No data
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-2 pt-3 pb-1 gap-3 border-t border-neutral-200 mt-2">
            <div className="w-full sm:w-1/3 text-left sm:text-right font-medium mb-2 sm:mb-0 text-sm">
              Discount(%)
            </div>
            <div className="w-full sm:w-1/3">
              <FormInput
                name="details.discountDetails.amount"
                type="number"
                placeholder="Discount percent"
                vertical
              />
            </div>
          </div>
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
              <span className="text-sm text-gray-500">Sub Total</span>
              <span className="font-semibold text-gray-700">
                {formatNumberWithCommas(watch("details.subTotal") || 0)}
              </span>
            </div>
            <div className="flex justify-between w-full text-base">
              <span className="text-sm text-gray-500">
                Discount ({watch("details.discountDetails.amount")}%)
              </span>
              <span className="font-semibold text-gray-700">
                {formatNumberWithCommas(
                  (watch("details.discountDetails.amount") *
                    watch("details.subTotal")) /
                    100 || 0
                )}
              </span>
            </div>

            <div className="flex justify-between w-full text-base">
              <span className="text-sm text-gray-500 font-medium">Total</span>
              <span className="font-semibold text-gray-700">
                {formatNumberWithCommas(watch("details.totalAmount") || 0)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuotationItems;
