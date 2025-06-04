import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate5 = (data: any) => {
  const { company, details, receiver, shipment } = data || {};

  return (
    <InvoiceLayout>
      <div className="bg-white p-10 min-h-[1100px]">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Delivery Receipt
        </h1>
        <div className="mb-6 text-base">
          <div>
            <span className="font-bold">Date:</span>{" "}
            {details?.invoiceDate &&
              new Date(details.invoiceDate).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
          </div>
          <div>
            <span className="font-bold">Recipient Name:</span>
            {"  "}
            {shipment?.name}
          </div>
          <div>
            <span className="font-bold">Delivery Address:</span>
            {"  "}
            {shipment?.address}
          </div>
          <br />
          <div>
            <span className="font-bold">Delivered by:</span>
            {"  "}
            {company?.name || "[YOUR COMPANY NAME]"}
          </div>
          <div>
            <span className="font-bold">Delivery Method:</span>
            {"  "}
            {shipment?.method || "Standard Shipping"}
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 mb-6">
            <thead>
              <tr>
                <th className="border px-4 py-2">Item Description</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Unit Price ($)</th>
                <th className="border px-4 py-2">Total ($)</th>
              </tr>
            </thead>
            <tbody>
              {details?.items?.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{item?.description}</td>
                  <td className="border px-4 py-2 text-center">
                    {item?.quantity}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {formatNumberWithCommas(Number(item?.total) || 0)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2" colSpan={3}>
                  Shipping Fee
                </td>
                <td className="border px-4 py-2 text-right">
                  {formatNumberWithCommas(Number(details?.shippingFee) || 0)}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold" colSpan={3}>
                  Total Amount
                </td>
                <td className="border px-4 py-2 text-right font-bold">
                  {formatNumberWithCommas(Number(details?.totalAmount) || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-8 text-sm">
          By signing below, I acknowledge receipt of the above items in good
          condition.
        </div>

        {/* Signature line */}
        <div className="h-12 border-b border-gray-400 w-1/3 mb-10"></div>

        {/* Thank you note */}
        <div className="mt-10 text-sm">
          Thank you for choosing {company?.name || "[YOUR COMPANY NAME]"} for
          your delivery needs. If you have any questions or need further
          assistance, please contact us at {company?.email || "[YOUR EMAIL]"}.
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate5;
