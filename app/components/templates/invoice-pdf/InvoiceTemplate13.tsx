import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { UploadCloud } from "lucide-react";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate13 = (data: any) => {
  const { company, details, shipment, receiver } = data || {};
  const items = details?.items || [];

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] p-8">
        <div className="text-4xl font-extrabold tracking-widest text-blue-900 leading-none text-right mb-4">
          COMMERCIAL INVOICE
        </div>
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-8">
          {/* Company Info */}
          <div>
            <div className="text-base font-semibold text-gray-800 mb-1">
              {company?.name || "[Company Name]"}
            </div>
            <div className="text-sm text-gray-700 leading-5">
              <div>{company?.address}</div>
              <div>
                {company?.city}
                {company?.zipCode ? ", " + company.zipCode : ""}
              </div>
              <div>{company?.phone}</div>
              <div>{company?.email}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-col gap-2 text-sm font-semibold text-blue-900 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-32 ">Invoice #</div>
                <div className="font-normal text-black ml-auto">
                  {details?.invoiceNumber || "DN-001"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 ">Invoice Date</div>
                <div className="font-normal text-black ml-auto">
                  {details.invoiceDate &&
                    new Date(details.invoiceDate).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Title & Info */}

        {/* Bill To & Ship To */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold text-xs text-blue-900 mb-1">Bill To</div>
            <div className="text-base font-semibold text-gray-800 mb-1">
              {receiver?.name || "[Client Name]"}
            </div>
            <div className="text-sm text-gray-700 leading-5">
              <div>{receiver?.address}</div>
              <div>{receiver?.email}</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-xs text-blue-900 mb-1">Ship To</div>
            <div className="text-base font-semibold text-gray-800 mb-1">
              {shipment?.company_name}
            </div>
            <div className="text-sm text-gray-700 leading-5">
              <div>{shipment?.name}</div>
              <div>{shipment?.address}</div>
              <div>{shipment?.email}</div>
              <div>{shipment?.phone_number}</div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-10 mb-2">
          <div className="grid grid-cols-12 bg-blue-900 text-white font-bold text-sm rounded-t">
            <div className="col-span-5 p-2 border-r border-solid border-blue-900 text-left">
              Description
            </div>
            <div className="col-span-2 p-2 border-r border-solid border-blue-900 text-right">
              QTY
            </div>
            <div className="col-span-2 p-2 border-r border-solid border-blue-900 text-right">
              Unit Price
            </div>
            <div className="col-span-3 p-2 text-right">Total</div>
          </div>
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-12 last:border-b-2 border-solid border-blue-900 text-sm"
              style={{
                borderBottom:
                  idx === items.length - 1 ? "1.5px solid #1e3a8a" : "",
              }}
            >
              <div className="col-span-5 p-2 text-left">
                {item?.description}
              </div>
              <div className="col-span-2 p-2 text-right">{item?.quantity}</div>
              <div className="col-span-2 p-2 text-right">
                {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
              </div>
              <div className="col-span-3 p-2 text-right">
                {formatNumberWithCommas(Number(item?.total) || 0)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals Section */}
        <div className="flex flex-row justify-end mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>
                  {formatNumberWithCommas(Number(details?.subTotal) || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Discount</span>
                <span>
                  {formatNumberWithCommas(Number(details?.discount) || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Subtotal less Discount</span>
                <span>
                  {formatNumberWithCommas(
                    Number(details?.subTotal) - Number(details?.discount) || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax Rate</span>
                <span>
                  {details?.taxRate ? `${details.taxRate}%` : "0.00%"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Total Tax</span>
                <span>
                  {formatNumberWithCommas(Number(details?.totalTax) || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping/Handling</span>
                <span>
                  {formatNumberWithCommas(Number(details?.shippingFee) || 0)}
                </span>
              </div>
              <div
                className="flex justify-between border-y-2 border-solid border-blue-900 py-2 mt-2 font-bold text-lg text-blue-900 w-full"
                style={{
                  borderBottom: "1px solid #1e3a8a ",
                  borderTop: "1px solid #1e3a8a ",
                }}
              >
                <span>Balance Due</span>
                <span>
                  {formatNumberWithCommas(Number(details?.totalAmount) || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Signature */}
        <div className="mt-10 text-xs text-gray-700">
          <div className="font-semibold mb-1">Terms & Conditions</div>
          <div className="mb-4">
            {details?.terms ||
              "[Include any terms or other information as needed]"}
          </div>
          <div className="flex flex-row justify-between items-end mt-8">
            <div>
              <div className="mb-2">
                I certify the above to be true and correct to the best of my
                knowledge.
              </div>
              <div className="h-8 border-b border-gray-400 w-48 mb-2"></div>
              <div>{details?.typedName}</div>
              <div>{company?.name}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Date</div>

              <div className="w-max">
                {details.signedDate &&
                  new Date(details.signedDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate13;
