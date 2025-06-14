import React from "react";
import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate14 = (data: any) => {
  const { company, details, receiver, shipment, additional, proforma } =
    data || {};
  const items = details?.items || [];

  // Totals and summary fields (mimic ProformaInvoiceTable logic)
  const totalTaxableAmount = items
    ?.filter((item: any) => item.taxable)
    ?.reduce((acc: number, curr: any) => acc + Number(curr.total || 0), 0);
  const taxRate = Number(details?.taxDetails?.amount) || 0;
  const taxAmount = (taxRate * Number(totalTaxableAmount)) / 100 || 0;
  const total =
    (Number(details?.totalAmount) || 0) -
    (((Number(details?.subTotal) || 0) * taxRate) / 100 || 0) +
    taxAmount;

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] py-8 px-4">
        <div className="text-4xl font-extrabold tracking-widest text-blue-900 leading-none text-right mb-4">
          PRO FORMA INVOICE
        </div>
        {/* Header */}
        <div className="grid grid-cols-2 gap-6 my-6">
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
          <div className="flex flex-col gap-2 text-sm font-semibold text-blue-900 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-32 ">Date</div>
              <div className="font-normal text-black ml-auto">
                {details?.invoiceDate &&
                  new Date(details.invoiceDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 ">Expiration Date</div>
              <div className="font-normal text-black ml-auto">
                {details?.dueDate &&
                  new Date(details.dueDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 ">Invoice #</div>
              <div className="font-normal text-black ml-auto break-words">
                {details?.invoiceNumber}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 ">Customer ID</div>
              <div className="font-normal text-black ml-auto break-words">
                {details?.customerId}
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Ship To & Shipping Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Customer */}
          <div className="flex-1 flex flex-col">
            <div className="font-bold text-xs text-white bg-blue-900 px-2 py-1 rounded-t ">
              CUSTOMER
            </div>
            <div className=" border border-t-0 border-blue-900 p-2 text-xs flex-1">
              <div>{receiver?.name || "[Name]"}</div>
              <div>{receiver?.email || "[Email]"}</div>
              <div>{receiver?.address || "[Street Address]"}</div>
            </div>
          </div>
          {/* Ship To */}
          <div className="flex-1 flex flex-col">
            <div className="font-bold text-xs text-white bg-blue-900 px-2 py-1 rounded-t">
              SHIP TO
            </div>
            <div className="border border-t-0 border-blue-900 p-2 text-xs flex-1">
              <div>{shipment?.name || "[Name]"}</div>
              <div>{shipment?.company_name || "[Company Name]"}</div>
              <div>{shipment?.address || "[Street Address]"}</div>
              <div>{shipment?.phone_number || "[Phone]"}</div>
            </div>
          </div>
          {/* Shipping Details */}
          <div>
            <div className="font-bold text-xs text-white bg-blue-900 px-2 py-1 rounded-t">
              SHIPPING DETAILS
            </div>
            <div className="border border-t-0 border-blue-900 p-2 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <p className=" break-words">Freight Type:</p>{" "}
                {proforma?.freightType || "[Air or Ocean]"}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className=" break-words">Est Ship Date:</p>{" "}
                {proforma?.estShipDate &&
                  new Date(proforma.estShipDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className=" break-words">Est Gross Weight:</p>{" "}
                {proforma?.grossWeight
                  ? `${proforma.grossWeight} ${proforma?.unitWeight}`
                  : "[weight] [units]"}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className=" break-words">Est Cubic Weight:</p>{" "}
                {proforma?.cubicWeight
                  ? `${proforma.cubicWeight} ${proforma?.unitWeight}`
                  : "[weight] [units]"}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className=" break-words">Total Packages:</p>{" "}
                {proforma?.totalPackage || "[Qty]"}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-4 mb-2">
          <div className="grid grid-cols-8 bg-blue-900 text-white font-bold text-xs rounded-t">
            <div className="col-span-1 p-2 border-r border-solid border-blue-900 text-left">
              PART NUMBER
            </div>
            <div className="col-span-1 p-2 border-r border-solid border-blue-900 text-left">
              UNIT OF MEASURE
            </div>
            <div className="col-span-2 p-2 border-r border-solid border-blue-900 text-left">
              DESCRIPTION
            </div>
            <div className="col-span-1 p-2 border-r border-solid border-blue-900 text-right">
              QTY
            </div>
            <div className="col-span-1 p-2 border-r border-solid border-blue-900 text-right">
              UNIT PRICE
            </div>
            <div className="col-span-1 p-2 border-r border-solid border-blue-900 text-center">
              TAX
            </div>
            <div className="col-span-1 p-2 text-right">TOTAL AMOUNT</div>
          </div>
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="grid grid-cols-8 last:border-b-2 border-solid border-blue-900 text-xs"
              style={{
                borderBottom:
                  idx === items.length - 1 ? "1.5px solid #1e3a8a" : "",
              }}
            >
              <div className="col-span-1 p-2 text-left">{item?.partNumber}</div>
              <div className="col-span-1 p-2 text-left">{item?.unit}</div>
              <div className="col-span-2 p-2 text-left">
                {item?.description}
              </div>
              <div className="col-span-1 p-2 text-right">{item?.quantity}</div>
              <div className="col-span-1 p-2 text-right">
                {formatNumberWithCommas(Number(item?.unitPrice) || 0)}
              </div>
              <div className="col-span-1 p-2 text-center">
                {item?.taxable ? "X" : ""}
              </div>
              <div className="col-span-1 p-2 text-right">
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
                <span>Taxable</span>
                <span>{formatNumberWithCommas(totalTaxableAmount)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax rate</span>
                <span>{taxRate ? `${taxRate}%` : "0.00%"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax</span>
                <span>{formatNumberWithCommas(taxAmount)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping fee</span>
                <span>
                  {formatNumberWithCommas(
                    Number(details?.shippingDetails?.cost) || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Insurance</span>
                <span>
                  {formatNumberWithCommas(
                    Number(details?.insuranceDetails?.cost) || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Legal/Consular</span>
                <span>
                  {formatNumberWithCommas(
                    Number(details?.legalDetails?.cost) || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Inspection/Cert</span>
                <span>
                  {formatNumberWithCommas(
                    Number(details?.inspectionDetails?.cost) || 0
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
                <span>TOTAL</span>
                <span>{formatNumberWithCommas(total)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Currency</span>
                <span>USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Comments */}
        <div
          className="mt-10 text-xs"
          style={{ breakBefore: "page", pageBreakBefore: "always" }}
        >
          <div className="font-bold text-xs text-white bg-blue-900 px-2 py-1 rounded-t mb-1">
            TERMS OF SALE AND OTHER COMMENTS
          </div>
          <div className="border border-t-0 border-blue-900 p-2 mb-4 min-h-[60px] whitespace-pre-line break-words">
            {details?.terms ||
              "[Include and terms of sale or other information as needed]"}
            {details?.paymentTerms && (
              <div>
                Payment Terms:{" "}
                <span className="break-words whitespace-pre-line">
                  {details.paymentTerms}
                </span>
              </div>
            )}
            {details?.deliveryTerms && (
              <div>
                Delivery Terms:{" "}
                <span className="break-words whitespace-pre-line">
                  {details.deliveryTerms}
                </span>
              </div>
            )}
            {details?.comments && (
              <div>
                Comments:{" "}
                <span className="break-words whitespace-pre-line">
                  {details.comments}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 text-xs">
          <div className="font-bold text-xs text-white bg-gray-700 px-2 py-1 rounded-t mb-1">
            ADDITIONAL DETAILS
          </div>
          <div className="border border-t-0 border-gray-700 p-2 whitespace-pre-line break-words">
            <div className="mb-1">
              <span>Country of Origin: </span>
              <span className="break-words">
                {additional?.country || "[Country]"}
              </span>
            </div>
            <div className="mb-1">
              <span>Port of Embarkation: </span>
              <span className="break-words">
                {additional?.portEmbarkation || "[Name]"}
              </span>
            </div>
            <div className="mb-1">
              <span>Port of Discharge: </span>
              <span className="break-words">
                {additional?.portDischarge || "[Name]"}
              </span>
            </div>
            <div className="mb-1">
              <span>Reason for Export: </span>
              <span className="break-words">
                {additional?.reasonForExport || ""}
              </span>
            </div>
            <div className="mt-4">
              I certify the above to be true and correct to the best of my
              knowledge.
            </div>
            <div className="flex flex-row justify-between items-end mt-8">
              <div>
                <div className="h-8 border-b border-gray-400 w-48 mb-2"></div>
                <div className="break-words">
                  {additional?.typedName || "[Typed Name]"}
                </div>
                <div className="break-words">
                  {company?.name || "[Company Name]"}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">Date</div>
                <div className="w-max">
                  {details?.signedDate &&
                    new Date(details.signedDate).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate14;
