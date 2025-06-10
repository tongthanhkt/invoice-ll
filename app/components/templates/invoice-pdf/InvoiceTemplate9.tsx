import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";

const InvoiceTemplate9 = (data: any) => {
  const { company, receiver, details } = data || {};
  const items = details?.items || [];
  console.log(items);
  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] px-6 py-8">
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-6 gap-6">
          {/* Company Info */}
          <div className="w-1/2">
            <div className="flex items-center gap-4 mb-2">
              <div>
                <div className="font-bold text-lg">{company?.name}</div>
                <div className="text-sm text-gray-700">{company?.address}</div>
                <div className="text-sm text-gray-700">
                  {company?.city} {company?.zipCode}
                </div>

                <div className="text-sm text-gray-700">
                  Phone: {company?.phone}
                </div>
              </div>
            </div>
            <div className="mt-40">
              <div className="font-bold text-sm text-neutral-900 mb-1">
                Bill To
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-1">
                {receiver?.name}
              </div>
              <div className="text-sm text-gray-700 leading-5">
                <div>{receiver?.address}</div>
                <div>{receiver?.email}</div>
              </div>
            </div>
          </div>
          {/* Debit Note Info */}
          <div className="w-1/2 flex flex-col items-end">
            <div className="text-3xl font-extrabold mb-2">Debit Note</div>
            <div className="mb-6">Credit Note# {details?.debitNoteNumber}</div>
            <div className="border border-neutral-800 rounded px-6 py-2 text-lg font-bold text-neutral-800 mb-4">
              Balance Due
              <br />
              <span className="text-2xl text-black">
                {details?.currency || "$"}
                {formatNumberWithCommas(details?.totalAmount || 0)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2 mt-20">
              <div>Debit Note Date</div>
              <div>
                {details?.invoiceDate
                  ? new Date(details.invoiceDate).toLocaleDateString("en-GB")
                  : ""}
              </div>
              <div>Terms</div>
              <div>{details?.term}</div>
              <div>Due Date</div>
              <div>
                {details?.dueDate
                  ? new Date(details.dueDate).toLocaleDateString("en-GB")
                  : ""}
              </div>
              <div>Reference Invoice#</div>
              <div>{details?.invoiceNumber}</div>
              <div>Reference Invoice Date</div>
              <div>
                {details?.refInvoiceDate
                  ? new Date(details.refInvoiceDate).toLocaleDateString("en-GB")
                  : ""}
              </div>
            </div>
          </div>
        </div>
        {/* Items Table */}
        <div className="mt-8">
          <div className="grid grid-cols-12 bg-gray-800 text-white font-bold text-sm rounded-t">
            <div className="col-span-1 p-2 border-r border-gray-700">#</div>
            <div className="col-span-5 p-2 border-r border-gray-700">
              Item & Description
            </div>
            <div className="col-span-2 p-2 border-r border-gray-700  ">
              Unit Price
            </div>
            <div className="col-span-2 p-2 border-r border-gray-700  ">
              Quantity
            </div>
            <div className="col-span-2 p-2  ">Total</div>
          </div>
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-12 border-b border-gray-200 text-sm"
            >
              <div className="col-span-1 p-2">{idx + 1}</div>
              <div className="col-span-5 p-2">{item.description}</div>
              <div className="col-span-2 p-2 ">
                {item.unitPrice &&
                  formatNumberWithCommas(Number(item.unitPrice))}
              </div>
              <div className="col-span-2 p-2 ">{item.quantity || 1}</div>
              <div className="col-span-2 p-2 ">
                {item.total && formatNumberWithCommas(Number(item.total))}{" "}
              </div>
            </div>
          ))}
        </div>
        {/* Totals */}
        <div className="flex flex-row justify-end mt-8 w-1/2 ml-auto">
          <div className="w-full border border-gray-300 p-4 bg-gray-50">
            <div className="flex justify-between py-1 text-sm">
              <span>Sub Total</span>
              <span>
                {details?.currency || "$"}
                {formatNumberWithCommas(details?.subTotal || 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 text-sm">
              <span>Tax Amount</span>
              <span>
                {details?.currency || "$"}
                {formatNumberWithCommas(details?.taxDetails?.amount || 0)}
              </span>
            </div>
            <div className="flex justify-between py-2 font-bold text-base">
              <span>Total</span>
              <span>
                {details?.currency || "$"}
                {formatNumberWithCommas(details?.totalAmount || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate9;
