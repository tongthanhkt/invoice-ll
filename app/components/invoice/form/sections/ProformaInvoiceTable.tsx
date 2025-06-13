"use client";

// RHF
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

// DnD

// Components
import { BaseButton } from "@/app/components";

// Icons
import { Plus } from "lucide-react";

// Types
import { InvoiceType, ItemType } from "@/types";
import ProformaInvoiceRow from "../ProformaInvoiceRow";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { formatNumberWithCommas } from "@/lib/helpers";

const ProformaInvoiceTable = () => {
  const { control, watch } = useFormContext<InvoiceType>();

  const ITEMS_NAME = "details.items";
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: ITEMS_NAME,
  });

  const addNewField = () => {
    append({
      partNumber: "",
      description: "",
      unit: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
      taxable: false,
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const totalTaxableAmount = useWatch({
    name: ITEMS_NAME,
    control,
  })
    ?.filter((field) => field.taxable)
    ?.reduce((acc: number, curr: ItemType) => acc + Number(curr.total || 0), 0);

  const taxAmount =
    (Number(watch("details.taxDetails.amount")) * Number(totalTaxableAmount)) /
      100 || 0;

  const total =
    watch("details.totalAmount") -
    (((watch("details.subTotal") || 0) *
      (watch("details.taxDetails.amount") || 0)) /
      100 || 0) +
    taxAmount;

  const summaryItems = [
    {
      label: "Subtotal",
      value: formatNumberWithCommas(watch("details.subTotal") || 0),
    },
    {
      label: "Taxable",
      value: formatNumberWithCommas(totalTaxableAmount),
    },
    {
      label: "Tax rate(%)",
      value: watch("details.taxDetails.amount") || 0,
    },
    {
      label: "Tax Amount",
      value: formatNumberWithCommas(taxAmount),
    },
    {
      label: "Shipping fee",
      value: formatNumberWithCommas(watch("details.shippingDetails.cost") || 0),
    },
    {
      label: "Insurance",
      value: formatNumberWithCommas(
        watch("details.insuranceDetails.cost") || 0
      ),
    },
    {
      label: "Legal/Consular",
      value: formatNumberWithCommas(watch("details.legalDetails.cost") || 0),
    },
    {
      label: "Inspection/Cert",
      value: formatNumberWithCommas(
        watch("details.inspectionDetails.cost") || 0
      ),
    },
    {
      label: "Total",
      value: formatNumberWithCommas(total),
      fontMedium: true,
    },
  ];

  const amountFields = [
    {
      label: "Tax rate(%)",
      name: "details.taxDetails.amount",
      placeholder: "Tax amount",
    },
    {
      label: "Shipping fee",
      name: "details.shippingDetails.cost",
      placeholder: "Shipping/Handling amount",
    },
    {
      label: "Insurance",
      name: "details.insuranceDetails.cost",
      placeholder: "0",
    },
    {
      label: "Legal/Consular",
      name: "details.legalDetails.cost",
      placeholder: "0",
    },
    {
      label: "Inspection/Cert",
      name: "details.inspectionDetails.cost",
      placeholder: "0",
    },
    {
      label: "Other",
      name: "details.otherDetails.cost",
      placeholder: "0",
    },
  ];

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
              <ProformaInvoiceRow
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

        {fields?.length ? (
          <div className=" flex flex-col items-start justify-end px-3 py-3 gap-3 border border-neutral-200 rounded-lg">
            {amountFields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-3 w-full items-center"
              >
                <div className="w-full font-medium mb-2 text-sm">
                  {field.label}
                </div>
                <div className="w-full">
                  <FormInput
                    name={field.name}
                    type="number"
                    placeholder={field.placeholder}
                    vertical
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

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

export default ProformaInvoiceTable;
