import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { UploadCloud } from "lucide-react";

const InvoiceTemplate8 = (data: any) => {
  const { company, details, provider, items } = data || {};

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] px-6">
        {/* Header */}
        <div className="flex flex-row justify-between items-start mb-6 gap-6">
          {/* Credit Note title */}
          <div className="w-full">
            <div className="flex gap-6 mb-6 justify-between ">
              <div>
                <div className="text-4xl font-extrabold text-black mb-16">
                  Credit Note
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-semibold mb-6">
                  <div>Credit no.</div>
                  <div className="font-normal">{details?.creditNoteNumber}</div>
                  <div>Original Invoice no.</div>
                  <div className="font-normal">{details?.invoiceNumber}</div>
                  <div>Credit date</div>
                  <div className="font-normal">
                    {details?.creditDate
                      ? new Date(details.creditDate).toLocaleDateString("en-GB")
                      : ""}
                  </div>
                  <div>Credit type</div>
                  <div className="font-normal">{details?.creditType}</div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <div className="text-sm text-gray-600 mb-2">
                    <div>{company?.name}</div>
                    <div>{company?.level}</div>
                    <div>{company?.address}</div>
                    <div>
                      {company?.city}
                      {company?.zipCode ? ", " + company.zipCode : ", ST 12345"}
                    </div>
                    <div>{company?.phone}</div>
                  </div>
                </div>
              </div>
              <div className=" text-sm">
                <div>{provider?.name}</div>
                <div>{provider?.address}</div>
                <div>{provider?.email}</div>
                <div>{provider?.phone_number}</div>
              </div>
            </div>
            {/* Customer/Provider info */}

            {/* Project info */}
            <div className="mb-6 ">
              <div className="flex gap-10 text-base mb-1">
                <span className="font-semibold">Re</span>{" "}
                <div className="w-full">
                  <div className="font-semibold">{details?.projectName}</div>
                  <div className="text-sm">
                    For professional services rendered from{" "}
                    {details?.startProjectDate
                      ? new Date(details.startProjectDate).toLocaleDateString(
                          "en-GB"
                        )
                      : ""}{" "}
                    to{" "}
                    {details?.endProjectDate
                      ? new Date(details.endProjectDate).toLocaleDateString(
                          "en-GB"
                        )
                      : ""}
                    .
                  </div>
                </div>
              </div>
            </div>
            {/* Items */}
            <div className="mb-8 ">
              {(items || details?.items).map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-row justify-between text-sm mb-1 max-w-[75%]"
                >
                  <div>{item?.description}</div>
                  <div>
                    {details?.currency || "$"}
                    {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Totals Table */}
        <div className="grid grid-cols-2 gap-4">
          {/* Note */}
          <div className="text-sm mt-8 mb-2">
            Please contact <strong>{details?.contact}</strong> should you have
            any queries with this credit note.
          </div>
          <div className="w-full  border border-black p-4 bg-white">
            <div className="flex flex-col gap-1 text-base">
              <div className="flex justify-between py-1">
                <span>Sub total</span>
                <span>
                  {formatNumberWithCommas(Number(details?.subTotal) || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax</span>
                <span>
                  {formatNumberWithCommas(Number(details?.taxDetails?.amount))}
                </span>
              </div>
              <div className="flex justify-between border-t-2 border-black py-2 mt-2 font-bold text-lg">
                <span>Total credit</span>
                <span>
                  {details?.currency || "$"}
                  {details?.totalAmount !== undefined
                    ? formatNumberWithCommas(details?.totalAmount || 0)
                    : "-"}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate8;
