import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";

const InvoiceTemplate11 = (data: any) => {
  const { provider, shipment, receiver, details } = data || {};
  const items = details?.items || [];

  // Helper for currency
  const formatCurrency = (value: number) => `${formatNumberWithCommas(value)}`;

  return (
    <InvoiceLayout data={data}>
      <div className="mb-8 px-6 pb-8">
        {/* Header */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="
            mt-10 text-sm flex flex-col gap-1"
          >
            <div className="font-semibold mb-1">BILL TO</div>
            <div>{receiver?.name}</div>
            <div>{receiver?.address}</div>
            <div>{receiver?.email}</div>
            <div>{receiver?.phone_number}</div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <div className="font-bold mb-1 text-2xl text-left">
              PURCHASE ORDER # {details?.invoiceNumber}
            </div>
            <div className="text-sm grid grid-cols-2 gap-4">
              <span className="text-left font-semibold">P.O. Date:</span>{" "}
              <span className="break-words">
                {details?.invoiceDate
                  ? new Date(details.invoiceDate).toLocaleDateString("en-GB")
                  : "---"}
              </span>
            </div>
            <div className="text-sm grid grid-cols-2 gap-4">
              <span className="text-left font-semibold">Payment Terms:</span>{" "}
              <span className="break-words">{details?.paymentTerms}</span>
            </div>
            <div className="text-sm grid grid-cols-2 gap-4">
              <span className="text-left font-semibold">Shipping Methods:</span>{" "}
              <span className="break-words">{details?.shippingMethod}</span>
            </div>
            <div className="text-sm grid grid-cols-2 gap-4">
              <span className="text-left font-semibold">Promise Date:</span>{" "}
              <span className="break-words">
                {details?.promiseDate
                  ? new Date(details.promiseDate).toLocaleDateString("en-GB")
                  : "---"}
              </span>
            </div>
          </div>
        </div>
        {/* Bill To, Vendor, Ship To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm mt-8">
          <div className="flex flex-col gap-1">
            <div className="font-semibold mb-1">VENDOR</div>
            <div>{provider?.name}</div>
            <div>{provider?.address}</div>
            <div>{provider?.phone_number}</div>
            <div>{provider?.email}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold mb-1">SHIP TO</div>
            <div>{shipment?.company_name}</div>
            <div>{shipment?.name}</div>
            <div>{shipment?.address}</div>
            <div>{shipment?.phone_number}</div>
          </div>
        </div>
        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ITEM DESCRIPTION</th>
                <th className="border p-2 text-right">QTY</th>
                <th className="border p-2 text-left">UNIT</th>
                <th className="border p-2 text-right">UNIT PRICE</th>
                <th className="border p-2 text-right">TOTAL COST</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="border p-2">
                    <div className="font-medium">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td className="border p-2 text-right">{item.quantity}</td>
                  <td className="border p-2">{item.unit || ""}</td>
                  <td className="border p-2 text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="border p-2 text-right">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Summary */}
        <div className="grid grid-cols-2 gap-10">
          <div className="text-xs  text-gray-600 mr-4">
            <div className="font-semibold mb-1 text-gray-800">NOTES</div>
            <div>
              The amount of the Purchase Order is the agreed fixed price and
              shall not be exceeded without advanced written consent from the
              Bill To contact identified on the order.
            </div>
          </div>
          <div className=" text-sm">
            <div className=" flex flex-col items-end gap-1 w-[70%] ml-auto">
              <div className="flex gap-8 w-full justify-between">
                <div className="text-left">Subtotal:</div>
                <div className="w-32 text-right">
                  {formatCurrency(details?.subTotal || 0)}
                </div>
              </div>
              <div className="flex gap-8 w-full justify-between">
                <div className="text-left">Discount:</div>
                <div className="w-32 text-right">
                  {formatNumberWithCommas(
                    (Number(details.discountDetails.amount) *
                      Number(details.subTotal)) /
                      100 || 0
                  )}
                </div>
              </div>
              <div className="flex gap-8 w-full justify-between">
                <div className="text-left">Shipping fee:</div>
                <div className="w-32 text-right">
                  {formatCurrency(details?.shippingDetails?.cost || 0)}
                </div>
              </div>
              <div className="flex gap-8 w-full justify-between ">
                <div className="text-left ">Tax:</div>
                <div className="w-32 text-right">
                  {formatCurrency(details?.taxDetails?.amount || 0)}
                </div>
              </div>
              <div className="flex gap-8 w-full justify-between font-semibold text-base border border-solid border-neutral-500 p-2 ">
                <div className="text-left">Total Cost</div>
                <div className="w-32 text-right">
                  {formatCurrency(details?.totalAmount || 0)} USD
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Notes */}
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate11;
