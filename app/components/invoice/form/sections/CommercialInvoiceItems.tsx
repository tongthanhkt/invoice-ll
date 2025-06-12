"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import { BaseButton, SingleItem } from "@/app/components";

// Icons
import { Plus } from "lucide-react";

// Types
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { InvoiceType } from "@/types";
import { formatNumberWithCommas } from "@/lib/helpers";

const CommercialInvoiceItems = () => {
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

  const summaryItems = [
    {
      label: "Subtotal",
      value: watch("details.subTotal") || 0,
    },
    {
      label: "Discount",
      value: formatNumberWithCommas(
        (Number(watch("details.discountDetails.amount")) *
          Number(watch("details.subTotal"))) /
          100 || 0
      ),
    },
    {
      label: "Subtotal less discount",
      value: formatNumberWithCommas(
        Number(watch("details.subTotal")) -
          (Number(watch("details.discountDetails.amount")) *
            Number(watch("details.subTotal"))) /
            100 || 0
      ),
    },
    {
      label: "Tax rate(%)",
      value: watch("details.taxDetails.amount") || 0,
    },
    {
      label: "Tax Amount",
      value: formatNumberWithCommas(
        (Number(watch("details.taxDetails.amount")) *
          Number(watch("details.subTotal"))) /
          100 || 0
      ),
    },
    {
      label: "Shipping fee",
      value: watch("details.shippingDetails.cost") || 0,
    },
    {
      label: "Total",
      value: watch("details.totalAmount") || 0,
      fontMedium: true,
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900 ">
            Items
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
          ) : (
            <div className="text-neutral-500 text-center py-4 text-sm">
              No data
            </div>
          )}
        </div>

        {/* Desktop view with border container */}
        <div className="hidden md:block border border-solid rounded-lg md:rounded-t-none md:border-t-0 border-neutral-200 py-2 md:-mt-4">
          {fields?.length ? (
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
          ) : (
            <div className="text-neutral-500 text-center py-4 text-sm">
              No data
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-2 pt-3 pb-1 gap-3 border-t border-neutral-200 mt-2">
            <div className="w-full sm:w-1/3 text-left sm:text-right font-medium mb-2 sm:mb-0 text-sm">
              Discount(%)
            </div>
            <div className="w-full sm:w-1/4">
              <FormInput
                name="details.discountDetails.amount"
                type="number"
                placeholder="Discount percent"
                vertical
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-2 pt-3 pb-1 gap-3">
            <div className="w-full sm:w-1/3 text-left sm:text-right font-medium mb-2 sm:mb-0 text-sm">
              Tax rate(%)
            </div>
            <div className="w-full sm:w-1/4">
              <FormInput
                name="details.taxDetails.amount"
                type="number"
                placeholder="Tax rate"
                vertical
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end px-2 pt-3 pb-1 gap-3 ">
            <div className="w-full sm:w-1/3 text-left sm:text-right font-medium mb-2 sm:mb-0 text-sm">
              Shipping fee
            </div>
            <div className="w-full sm:w-1/4">
              <FormInput
                name="details.shippingDetails.cost"
                type="number"
                placeholder="Shipping/Handling amount"
                vertical
              />
            </div>
          </div>
        </div>

        {/* Mobile tax section */}
        <div className="md:hidden flex flex-col items-start justify-end px-3 py-3 gap-3 border border-neutral-200 rounded-lg">
          <div className="w-full flex items-center justify-between">
            <div className="w-full font-medium ">Shipping free</div>
            <div className="w-full">
              <FormInput
                name="details.shippingDetails.cost"
                type="number"
                placeholder="Shipping/Handling amount"
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
            {summaryItems.map((item, idx) => (
              <div
                className="flex justify-between w-full text-base"
                key={item.label}
              >
                <span
                  className={`text-sm text-gray-500${
                    item.fontMedium ? " font-medium" : ""
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`font-semibold text-gray-700${
                    item.fontMedium ? " font-medium" : ""
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CommercialInvoiceItems;
