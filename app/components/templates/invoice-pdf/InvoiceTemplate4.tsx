import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { UploadCloud } from "lucide-react";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate4 = (data: any) => {
  const { company, details, receiver } = data || {};

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px]">
        {/* Header: Logo + Upload */}
        <div className="flex flex-row justify-between items-start">
          {/* Company Info */}
          <div className="pt-2">
            <div className="text-base font-semibold text-gray-800 mb-1">
              {company?.name || "Your Company Inc."}
            </div>
            <div className="text-sm text-gray-700 leading-5">
              <div>{company?.address || "1234 Company St,"}</div>
              <div>
                {company?.city || "Company Town"}
                {company?.zipCode ? ", " + company.zipCode : ", ST 12345"}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-64 h-14 border border-blue-700 rounded flex items-center justify-center gap-2 text-blue-700 text-lg font-medium mb-2 bg-white">
              <UploadCloud className="w-6 h-6" />
              Upload Logo
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between items-end mb-6 mt-10">
          {/* Title + Receipt Info */}
          <div className="flex flex-col items-end">
            <div className="text-4xl font-extrabold tracking-widest text-blue-900 leading-none text-right mb-4">
              SERVICES
              <br />
              RECEIPT
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold text-blue-900 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-28 text-right">Receipt #</div>
                <div className="font-normal text-black  ml-auto">
                  {details?.invoiceNumber || "0000457"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-28 text-right">Receipt date</div>
                <div className="font-normal text-black  ml-auto">
                  {details?.invoiceDate
                    ? new Date(details.invoiceDate).toLocaleDateString("en-GB")
                    : "11-04-2023"}
                </div>
              </div>
            </div>
          </div>
          {/* Billed To */}
          <div>
            <div className="font-bold text-xs text-blue-900 mb-1">
              Billed To
            </div>
            <div className="text-base font-semibold text-gray-800 mb-1">
              {receiver?.name || "Customer Name"}
            </div>
            <div className="text-sm text-gray-700 leading-5">
              <div>{receiver?.address || "1234 Customer St,"}</div>
              <div>
                {receiver?.city || "Customer Town"}
                {receiver?.zipCode ? ", " + receiver.zipCode : ", ST 12345"}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-10 mb-2">
          <div className="grid grid-cols-12 bg-blue-900 text-white font-bold text-sm rounded-t">
            <div className="col-span-2 p-2 border-r border-solid border-blue-900 text-left">
              Quantity
            </div>
            <div className="col-span-6 p-2 border-r border-solid border-blue-900 text-left">
              Description
            </div>
            <div className="col-span-2 p-2 border-r border-solid border-blue-900 text-right">
              Unit Price
            </div>
            <div className="col-span-2 p-2 text-right">Amount</div>
          </div>
          {details?.items?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-12 last:border-b-2 border-solid border-blue-900 text-sm"
              style={{
                borderBottom:
                  idx === details?.items?.length - 1
                    ? "1.5px solid #1e3a8a"
                    : "",
              }}
            >
              <div className="col-span-2 p-2 text-left">{item?.quantity}</div>
              <div className="col-span-6 p-2 text-left">
                {item?.description}
              </div>
              <div className="col-span-2 p-2 text-right">
                {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
              </div>
              <div className="col-span-2 p-2 text-right">
                {formatNumberWithCommas(Number(item?.total) || 0)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
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
                <span>Sales Tax (5%)</span>
                <span>
                  {formatNumberWithCommas(
                    ((details?.taxDetails?.amount || 0) *
                      (details?.subTotal || 0)) /
                      100
                  )}
                </span>
              </div>
              <div
                className="flex justify-between border-y-2 border-solid border-blue-900 py-2 mt-2 font-bold text-lg text-blue-900 w-full"
                style={{
                  borderBottom: "1px solid #1e3a8a ",
                  borderTop: "1px solid #1e3a8a ",
                }}
              >
                <span>Total (USD)</span>
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
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate4;
