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
      quantity: 0,
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

  const summaryItems = [
    {
      label: "Subtotal",
      value: watch("details.subTotal") || 0,
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
      value: watch("details.shippingDetails.cost") || 0,
    },
    {
      label: "Insurance",
      value: watch("details.insuranceDetails.cost") || 0,
    },
    {
      label: "Legal/Consular",
      value: watch("details.legalDetails.cost") || 0,
    },
    {
      label: "Inspection/Cert",
      value: watch("details.inspectionDetails.cost") || 0,
    },
    {
      label: "Total",
      value: watch("details.totalAmount") + taxAmount || 0,
      fontMedium: true,
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

        <div className=" flex flex-col items-start justify-end px-3 py-3 gap-3 border border-neutral-200 rounded-lg">
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">Tax rate</div>
            <div className="w-full">
              <FormInput
                name="details.taxDetails.amount"
                type="number"
                placeholder="Tax amount"
                vertical
              />
            </div>
          </div>{" "}
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">Shipping fee</div>
            <div className="w-full">
              <FormInput
                name="details.shippingDetails.cost"
                type="number"
                placeholder="Shipping/Handling amount"
                vertical
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">Insurance</div>
            <div className="w-full">
              <FormInput
                name="details.insuranceDetails.cost"
                type="number"
                placeholder="Insurance amount"
                vertical
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">
              Legal/Consular
            </div>
            <div className="w-full">
              <FormInput
                name="details.legalDetails.cost"
                type="number"
                placeholder="Legal/Consular amount"
                vertical
              />
            </div>
          </div>{" "}
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">
              Inspection/Cert
            </div>
            <div className="w-full">
              <FormInput
                name="details.inspectionDetails.cost"
                type="number"
                placeholder="Inspection/Cert amount"
                vertical
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full items-center">
            <div className="w-full font-medium mb-2 text-sm">Other</div>
            <div className="w-full">
              <FormInput
                name="details.otherDetails.cost"
                type="number"
                placeholder="Other amount"
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

export default ProformaInvoiceTable;
