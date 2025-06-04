import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate4 = (data: any) => {
  const { company, details, receiver, shipment } = data || {};

  return (
    <InvoiceLayout>
      <div className="bg-white p-8 border-t-4 border-red-600 min-h-[1100px]">
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-500 tracking-wide mb-4">
              RECEIPT
            </h1>
            <div className="text-sm text-gray-700 leading-6">
              <div>{company?.name}</div>
              <div>{company?.address}</div>
              <div>
                {company?.city}, {company?.zipCode}
              </div>
              <div>{company?.phone}</div>
              <div>{company?.email}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold">
              LOGO
            </div>
            <div className="text-xs text-right mt-2">
              <div className="font-semibold tracking-wider">PAYMENT DATE</div>
              <div>
                {details.invoiceDate &&
                  new Date(details.invoiceDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
              </div>
              <div className="font-semibold tracking-wider mt-2">
                RECEIPT NO.
              </div>
              <div>{details?.invoiceNumber}</div>
            </div>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="font-bold text-xs text-blue-900 mb-1 border-b border-gray-300 pb-1">
              BILL TO
            </div>
            <div className="text-sm text-gray-800 leading-6">
              <div>{receiver?.name}</div>
              {receiver?.company_name && <div>{receiver?.company_name}</div>}
              <div>{receiver?.address}</div>
              {receiver?.phone_number && <div>{receiver?.phone_number}</div>}
              {receiver?.email && <div>{receiver?.email}</div>}
            </div>
          </div>
          <div>
            <div className="font-bold text-xs text-blue-900 mb-1 border-b border-gray-300 pb-1">
              SHIP TO
            </div>
            <div className="text-sm text-gray-800 leading-6">
              <div>{shipment?.name}</div>
              {shipment?.company_name && <div>{shipment?.company_name}</div>}
              <div>{shipment?.address}</div>
              {shipment?.phone_number && <div>{shipment?.phone_number}</div>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="grid grid-cols-12 bg-red-700 text-white font-semibold text-xs">
            <div className="col-span-6 p-2 border-r border-white">
              DESCRIPTION
            </div>
            <div className="col-span-2 p-2 border-r border-white text-center">
              QTY
            </div>
            <div className="col-span-2 p-2 border-r border-white text-center">
              UNIT PRICE
            </div>
            <div className="col-span-2 p-2 text-center">TOTAL</div>
          </div>
          {details?.items?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-12 border-b border-gray-200 text-xs"
            >
              <div className="col-span-6 p-2">{item?.description}</div>
              <div className="col-span-2 p-2 text-center">{item?.quantity}</div>
              <div className="col-span-2 p-2 text-center">
                {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
              </div>
              <div className="col-span-2 p-2 text-center">
                {formatNumberWithCommas(Number(item?.total) || 0)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-row justify-end">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between border-b border-gray-200 py-1">
                <span className="font-semibold">SUBTOTAL</span>
                <span>
                  {formatNumberWithCommas(Number(details?.subTotal) || 0)}
                </span>
              </div>
              {details?.discount !== undefined && (
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold">DISCOUNT</span>
                  <span>{formatNumberWithCommas(details?.discount || 0)}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 py-1">
                <span className="font-semibold">SUBTOTAL LESS DISCOUNT</span>
                <span>
                  {formatNumberWithCommas(
                    details?.discountDetails?.amount || 0
                  )}
                </span>
              </div>

              {details?.taxDetails?.amount !== undefined && (
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold">TOTAL TAX</span>
                  <span>
                    {formatNumberWithCommas(details?.taxDetails?.amount || 0)}
                  </span>
                </div>
              )}
              {details?.shippingDetails?.cost !== undefined && (
                <div className="flex justify-between border-b border-gray-200 py-1">
                  <span className="font-semibold">SHIPPING/HANDLING</span>
                  <span>
                    {formatNumberWithCommas(
                      details?.shippingDetails?.cost || 0
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t-2 border-gray-400 py-2 mt-2 font-bold text-base">
                <span>Paid</span>
                <span>
                  $
                  {details?.totalAmount !== undefined
                    ? formatNumberWithCommas(details?.totalAmount || 0)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {details?.remarks && (
          <div className="mt-6 text-xs text-gray-600">
            Remarks, notes: {details?.remarks}
          </div>
        )}
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate4;
