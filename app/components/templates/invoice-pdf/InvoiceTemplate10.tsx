import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";

const InvoiceTemplate10 = (data: any) => {
  const { company, receiver, details, payer } = data || {};
  const items = details?.items || [];

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] px-6 py-8 font-sans text-[15px] text-black">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="text-3xl font-bold mb-2"
            style={{
              color: "#f97316",
            }}
          >
            Quotation
          </div>
          <div className="flex w-full justify-between items-start">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-4">
              {company?.logo && (
                <img
                  src={company.logo}
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              )}
            </div>
            {/* Quotation Info */}
            <div className="text-right space-y-1">
              <div className="text-sm text-neutral-600">
                Quotation#{" "}
                <span className="font-semibold text-black">
                  {details?.invoiceNumber || "---"}
                </span>
              </div>
              <div className="text-sm text-neutral-600">
                Quotation Date{" "}
                <span className="font-semibold text-black">
                  {details?.invoiceDate
                    ? new Date(details.invoiceDate).toLocaleDateString("en-GB")
                    : "---"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quotation By / To */}
        <div className="flex flex-row gap-8 mb-4">
          {/* Quotation By */}
          <div
            className=" rounded-lg p-4 flex-1 "
            style={{
              backgroundColor: "#fff7ed ",
            }}
          >
            <div
              className="font-semibold mb-1 "
              style={{
                color: "#c2410c",
              }}
            >
              Quotation by
            </div>
            <div className="font-bold text-black">{payer?.name}</div>
            <div className="text-sm text-neutral-700">{payer?.email}</div>
            <div className="text-sm text-neutral-700">{payer?.address}</div>
          </div>
          {/* Quotation To */}
          <div
            className=" rounded-lg p-4 flex-1 "
            style={{
              backgroundColor: "#fff7ed ",
            }}
          >
            <div
              className="font-semibold mb-1 "
              style={{
                color: "#c2410c",
              }}
            >
              Quotation to
            </div>
            <div className="font-bold text-black">{receiver?.name}</div>
            <div className="text-sm text-neutral-700">{receiver?.email}</div>
            <div className="text-sm text-neutral-700">{receiver?.address}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-4 mb-2">
          <div
            className="grid grid-cols-12 text-white font-bold text-sm rounded-t"
            style={{
              backgroundColor: "#f97316",
            }}
          >
            <div
              className="col-span-1 p-2 border-r "
              style={{ borderColor: "#fb923c " }}
            >
              #
            </div>
            <div
              className="col-span-5 p-2 border-r "
              style={{ borderColor: "#fb923c " }}
            >
              Item / Item description
            </div>
            <div
              className="col-span-2 p-2 border-r text-right"
              style={{ borderColor: "#fb923c " }}
            >
              Quantity
            </div>
            <div
              className="col-span-2 p-2 border-r  text-right"
              style={{ borderColor: "#fb923c " }}
            >
              Unit Price
            </div>
            <div className="col-span-2 p-2 text-right">Amount</div>
          </div>
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-12 border-b border-orange-100 text-sm"
            >
              <div className="col-span-1 p-2">{idx + 1}</div>
              <div className="col-span-5 p-2">{item?.description}</div>
              <div className="col-span-2 p-2 text-right">
                {item?.quantity || 1}
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

        {/* Bottom Section: Terms, Notes, Totals */}
        <div className="flex flex-row gap-8 mt-8">
          {/* Terms and Notes */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <div className="font-bold text-black mb-1">
                Terms and Conditions
              </div>
              <ol className="list-decimal list-inside text-sm text-neutral-700 pl-4">
                <li>
                  Please pay within 15 days from the date of invoice, overdue
                  interest @ 14% will be charged on delayed payments.
                </li>
                <li>Please quote invoice number when remitting funds.</li>
              </ol>
            </div>
            <div>
              <div className="font-bold text-black mb-1">Additional Notes</div>
              <div className="text-sm text-neutral-700">
                {details?.additionalNotes}
              </div>
            </div>
          </div>
          {/* Totals */}
          <div className="flex-1 max-w-[320px] ml-auto">
            <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
              <div className="flex justify-between py-1 text-sm">
                <span>Sub Total</span>
                <span>${formatNumberWithCommas(details?.subTotal || 0)}</span>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>Discount({details?.discountDetails?.amount || 0}%)</span>
                <span>
                  $
                  {formatNumberWithCommas(
                    (Number(details.discountDetails.amount) *
                      Number(details.subTotal)) /
                      100 || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total</span>
                <span>
                  ${formatNumberWithCommas(details?.totalAmount || 0)}
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-neutral-700">
              <span className="font-semibold">Invoice Total (in words): </span>
              <span className="italic">
                {details?.totalAmountInWords || "---"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Contact info and signature */}
        <div className="flex flex-row justify-between items-end mt-12 pt-8 border-t border-neutral-200">
          <div>
            <div className="text-sm text-neutral-700 mb-1 w-1/2">
              For any enquiries, email us on{" "}
              <span className="font-semibold">
                {details?.contactInformation?.email || company?.email}
              </span>{" "}
              or call us on{" "}
              <span className="font-semibold">
                {details?.contactInformation?.phone || company?.phone}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="h-12"></div>
            <div className="font-bold text-black border-t border-neutral-400 pt-1 w-40 text-center">
              Authorized Signature
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate10;
