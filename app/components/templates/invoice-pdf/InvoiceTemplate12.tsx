import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { UploadCloud } from "lucide-react";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate12 = (data: any) => {
  const { company, details, shipment } = data || {};
  const totalQuantity = details?.items?.reduce(
    (acc: number, curr: any) => acc + Number(curr.quantity || 0),
    0
  );

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] p-8">
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-8">
          <div>
            <div className="text-base font-semibold text-gray-800 mb-1">
              {company?.name || "[Company Name]"}
            </div>
          </div>
          <div className="text-4xl font-extrabold tracking-widest text-blue-400 leading-none text-right mb-4">
            DELIVERY ORDER
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-row gap-4">
            <div className=" font-medium">Job No.</div>
            <div className=" flex-1 min-w-0 break-words">
              {details?.jobNo || "________"}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className=" font-medium">Invoice No.</div>
            <div className=" flex-1 min-w-0 break-words">
              {details?.invoiceNumber || "________"}
            </div>
          </div>
        </div>

        {/* Delivery To & Address */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="font-medium text-blue-700 mb-1">Delivery To</div>
            <div className="border border-gray-300 min-h-[48px] p-2">
              {shipment?.name || ""}
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-700 mb-1">
              Delivery Address
            </div>
            <div className="border border-gray-300 min-h-[48px] p-2">
              {shipment?.address || ""}
            </div>
          </div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-4 gap-0 mb-6 border border-gray-300">
          <div className="p-2 border-b border-r font-medium">Date</div>
          <div className="p-2 border-b border-r">
            {details?.date &&
              new Date(details.date).toLocaleDateString("en-US", DATE_OPTIONS)}
          </div>
          <div className="p-2 border-b border-r font-medium">O/D No.</div>
          <div className="p-2 border-b break-words">{details?.ODNo || ""}</div>

          <div className="p-2 border-b border-r font-medium">Lot No.</div>
          <div className="p-2 border-b border-r">{details?.lotNo || ""}</div>
          <div className="p-2 border-b border-r font-medium">Container No.</div>
          <div className="p-2 border-b break-words">
            {details?.containerNo || ""}
          </div>

          <div className="p-2 border-b border-r font-medium">Flight No</div>
          <div className="p-2 border-b border-r">{details?.flightNo || ""}</div>
          <div className="p-2 border-b border-r font-medium">E.T.A</div>
          <div className="p-2 border-b break-words">{details?.eta || ""}</div>

          <div className="p-2 border-r font-medium">Form Type</div>
          <div className="p-2 border-r break-words">
            {details?.formType || ""}
          </div>
          <div className="p-2 border-r font-medium">Loading Port</div>
          <div className="p-2 break-words">{details?.loadingPort || ""}</div>
        </div>

        {/* Items Table */}
        <div className="mt-6 mb-2">
          <table className="w-full border border-gray-300 table-fixed">
            <thead>
              <tr className="bg-blue-900 text-white text-sm">
                <th className="p-2 border-r break-words">Marks& No.</th>
                <th className="p-2 border-r break-words">Qty</th>
                <th className="p-2 border-r break-words">Unit</th>
                <th className="p-2 border-r break-words">
                  Description of Goods
                </th>
                <th className="p-2 border-r break-words">Weight in Unit</th>
                <th className="p-2 break-words">Measurement in Unit</th>
              </tr>
            </thead>
            <tbody>
              {details?.items?.length ? (
                details.items.map((item: any, idx: number) => (
                  <tr
                    key={idx}
                    className="text-center border-t border-gray-200"
                  >
                    <td className="p-2 border-r break-words">{item.no}</td>
                    <td className="p-2 border-r break-words">
                      {item.quantity}
                    </td>
                    <td className="p-2 border-r break-words">{item.unit}</td>
                    <td className="p-2 border-r break-words">{item.name}</td>
                    <td className="p-2 border-r break-words">
                      {item.weightInUnit}
                    </td>
                    <td className="p-2 break-words">{item.measurement}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-2 text-center text-gray-400">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Quantity */}
        <div className="flex flex-row justify-end mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-blue-700 font-medium">
                  Total Quantity:
                </span>
                <span className="font-semibold text-gray-700">
                  {totalQuantity || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate12;
