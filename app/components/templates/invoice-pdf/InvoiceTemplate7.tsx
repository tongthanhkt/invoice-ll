import React from "react";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate7 = (data: any) => {
  const { acceptance, payer, provider, details } = data || {};

  return (
    <InvoiceLayout data={data}>
      <div className="bg-white px-6 py-8 font-sans text-[15px] text-black min-h-[1100px]">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-xl font-bold">SERVICE ACCEPTANCE REPORT</div>
          <div className="text-lg font-semibold mt-1">UNDER THE PROGRAMME</div>
        </div>

        {/* Programme Name */}
        <div className="text-center mb-8">
          {acceptance?.programName ? (
            <div className="text-lg font-semibold -mt-1">
              {acceptance?.programName}
            </div>
          ) : (
            <>
              <div className="border-b border-dotted border-black w-4/5 mx-auto mb-1"></div>
              <div className="italic text-sm text-gray-700">
                (please enter the name of theProgramme under which the Project
                is being implemented)
              </div>
            </>
          )}
        </div>

        {/* Place, Date */}
        <div className="flex justify-end mb-8">
          <div className="text-right">
            <span className="inline-block  border-b border-dotted border-black mr-2"></span>
            <span className="inline-block  border-b border-dotted border-black"></span>
            <div className="text-xs mt-1">
              {acceptance?.address || details?.invoiceDate
                ? `${acceptance?.address || ""}, ${new Date(
                    details?.invoiceDate
                  ).toLocaleDateString("en-US", DATE_OPTIONS)}`
                : "(place, date)"}
            </div>
          </div>
        </div>

        {/* Ordering Party & Contractor */}
        <div className="mb-8">
          <div className="flex mb-4">
            <div className="w-1/3 font-semibold">The Ordering Party:</div>
            <div className="flex-1">
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {payer?.name}
              </div>
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {payer?.email}
              </div>

              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {payer?.address}
              </div>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/3 font-semibold">The Contractor:</div>
            <div className="flex-1">
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {provider?.name}
              </div>
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {provider?.email}
              </div>
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {provider?.address}
              </div>{" "}
              <div className="border-b border-dotted border-neutral-500 mb-1 w-full min-h-[20px]">
                {provider?.phone_number}
              </div>
            </div>
          </div>
        </div>

        {/* Subject of the agreement */}
        <div className="mb-4">
          <span className="font-semibold">
            Subject of the agreement/performance of the order:
          </span>
          <span className="inline-block  mx-2">
            {acceptance?.content || "_____________________"}
          </span>
          <span className="italic text-xs">(subject of the agreement)</span>
        </div>
        <div className="mb-4">
          under the Project{" "}
          <span className="inline-block  mx-2">
            {acceptance?.projectName || "_____________________"};{" "}
            {acceptance?.agreementNumber || "___________"}
          </span>
          <span className="italic text-xs">
            (Project name; agreement number)
          </span>
        </div>

        {/* Main body */}
        <div className="mb-4">
          On{" "}
          <span className=" inline-block  mx-2">
            {acceptance?.acceptanceDate &&
              new Date(acceptance?.acceptanceDate).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
          </span>{" "}
          it was found that the Contractor had performed the subject of the
          agreement defined in {acceptance?.contractClauseReference || "____"}{" "}
          of the agreement within the time limit specified in{" "}
          {acceptance?.clauseNumber || "____"} of that agreement.
        </div>
        <div className="mb-4">
          The Ordering Party has evaluated the completed subject of the
          agreement and finds as follows:
          <ul className="list-disc pl-8 mt-2">
            <li>
              the agreement {acceptance?.agreementPerformWithinTime || "____"}{" "}
              performed within the set time limit
            </li>
            <li>
              the agreement {acceptance?.agreementPerformWithinTime || "____"}{" "}
              performed in accordance with the subject of the agreement
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <span className="bg-blue-100 px-1">
            In view of the above, the Ordering Party states that there are
          </span>{" "}
          {acceptance?.groundsForPayment || "____"} for payment of the
          remuneration specified in {acceptance?.termsOfPayment || "____"} of
          the Agreement.
        </div>
        <div className="mb-4">
          The Report has been drawn up in two identical counterparts, one
          counterpart for the Ordering Party and one for the Contractor.
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-14 pt-8">
          <div className="text-center">
            <div className="border-b border-dotted border-black  mx-auto mb-1"></div>
            <div className="text-xs">
              STAMP AND SIGNATURE OF THE ORDERING PARTY
            </div>
          </div>
          <div className="text-center">
            <div className="border-b border-dotted border-black  mx-auto mb-1"></div>
            <div className="text-xs">STAMP AND SIGNATURE OF THE CONTRACTOR</div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate7;
