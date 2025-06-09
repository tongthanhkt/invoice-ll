import React from "react";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";
import { formatNumberWithCommas } from "@/lib/helpers";

const InvoiceTemplate3 = ({
  serviceAgreement,
  payer,
  receiver,
}: {
  serviceAgreement: any;
  payer: any;
  receiver: any;
}) => {
  return (
    <InvoiceLayout>
      <div style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        <h1 className="text-center font-bold mb-6 text-2xl">
          Service Agreement
        </h1>
        <p>
          This Service Agreement (the <strong>"Agreement")</strong> is entered
          into{" "}
          {serviceAgreement?.invoiceDate
            ? new Date(serviceAgreement?.invoiceDate).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )
            : "________"}{" "}
          (<strong>1</strong>)(the <strong>"Effective Date")</strong>) by and
          between {receiver?.name || "________"} (<strong>2</strong>)(the{" "}
          <strong>"Customer")</strong>) located at{" "}
          {receiver?.address || "________"}(<strong>3</strong>) and{" "}
          {payer?.name || "________"}(<strong>4</strong>)(the{" "}
          <strong>"Service Provider")</strong>) located at{" "}
          {payer?.address || "________"}(<strong>5</strong>), also individually
          referred to as the <strong>"Party"</strong>, and collectively the{" "}
          <strong>"Parties"</strong>.
        </p>

        <ol className="pl-6 text-base list-decimal">
          <li className="mb-6">
            <strong>Services.</strong> The Service Provider shall perform the
            services listed in this Section 1 (the "Services").{" "}
            <strong>(6)</strong>
            <ol className="pl-6 ">
              {serviceAgreement?.services?.map(
                (service: { name: string }, index: number) => (
                  <li key={`${service} ${index}`}>
                    1.{index + 1}. {service.name}
                  </li>
                )
              )}
            </ol>
          </li>
          <li className="mb-6">
            <strong>Compensation.</strong> The Customer agrees to pay the
            Service Provider {serviceAgreement?.cost?.total}$ as payment for the
            Services provided. This fee will be paid in accordance with the
            following schedule: <strong>(7)</strong>
            <ul className="pl-6 list-none">
              <li>
                Total Cost of the Services:{" "}
                {serviceAgreement?.cost?.total
                  ? formatNumberWithCommas(
                      Number(serviceAgreement?.cost?.total)
                    )
                  : "________"}
              </li>
              <li>
                Amount Due at Signing:{" "}
                {serviceAgreement?.cost?.paid
                  ? formatNumberWithCommas(Number(serviceAgreement?.cost?.paid))
                  : "________"}
              </li>
              <li>
                Amount Due at Completion:{" "}
                {serviceAgreement?.cost?.remaining
                  ? formatNumberWithCommas(
                      Number(serviceAgreement?.cost?.remaining)
                    )
                  : "________"}
              </li>
            </ul>
          </li>
          <li className="mb-6">
            <strong>Expenses.</strong> The Customer agrees to reimburse the
            Service Provider for all expenses incurred as a result of performing
            the Services. The Service Provider agrees to submit all expenses to
            the Customer for approval prior to incurring the expense. All
            expenses must be approved in writing. The Customer will not be
            liable to reimburse the Service Provider for any expense(s) that was
            not pre-approved.
          </li>
          <li className="mb-6">
            <strong>Payment.</strong> The Service Provider shall submit an
            invoice to the Customer every{" "}
            {serviceAgreement?.payment?.frequency || (
              <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
            )}{" "}
            <strong>(8)</strong>
            days. Invoices shall be paid within{" "}
            {serviceAgreement?.payment?.dueDate || (
              <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
            )}{" "}
            <strong>(9)</strong>
            days from the date of the invoice. Payments may be made by credit
            card/electronic transfer/check as follows: <strong>(10)</strong>
            <ul className="pl-6 list-disc">
              {serviceAgreement?.payment?.methods?.map(
                (method: string, index: number) => (
                  <li key={index}>{method}</li>
                )
              )}
            </ul>
          </li>
          <li className="mb-6">
            <strong>Term.</strong> The term of this Agreement shall commence on
            the Effective Date, as stated above, and continue for{" "}
            {serviceAgreement?.term?.duration || (
              <span className="inline-block min-w-[80px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
            )}{" "}
            <strong>(11)</strong>
            {serviceAgreement?.term?.unit || "days/months/years"} , unless
            otherwise terminated per the terms of this Agreement.
          </li>
          <li className="mb-6">
            <strong>Termination.</strong>
            <ol className="pl-6 list-decimal">
              <li>
                Either Party may terminate the Agreement at any time upon{" "}
                {serviceAgreement?.noticePeriod || (
                  <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
                )}{" "}
                <strong>(12)</strong>
                days prior written notice to the other Party. In the event the
                Customer terminates the Agreement, the Customer shall still
                remain obligated to pay the Service Provider for any Services
                performed up to the date of termination and any expenses
                approved, but not paid, prior to the date of termination. In the
                event the Service Provider terminates the Agreement, the Service
                Provider shall reimburse the Customer any amounts previously
                paid to the Service Provider for which the Service Provider has
                not yet performed the Services.
              </li>
              <li>
                This Agreement will automatically terminate when both Parties
                have performed all of their obligations under the Agreement and
                all payments have been received.
              </li>
            </ol>
          </li>
          <li className="mb-6">
            <strong>Relationship of the Parties.</strong>
            <ol className="pl-6 list-decimal">
              <li>
                <strong>No Exclusivity.</strong> The Parties understand this
                Agreement is not an exclusive arrangement. The Parties agree
                they are free to enter into other similar agreements with other
                parties. The Service Provider agrees the Service Provider will
                not enter into any agreements that conflict with the Service
                Provider's obligations under this Agreement.
              </li>
              <li>
                <strong>Independent Contractor.</strong> The Service Provider is
                an independent contractor. Neither Party is an agent,
                representative, partner, or employee of the other Party.
              </li>
            </ol>
          </li>
          <li className="mb-6">
            <strong>Dispute Resolution.</strong>
            <ol className="pl-6 list-decimal">
              <li>
                <strong>Choice of Law.</strong> The Parties agree that this
                Agreement shall be governed by the State and/or Country in which
                the duties of this Agreement are expected to take place. In the
                event that the duties of this Agreement are to take place in
                multiple States and/or Countries, this Agreement shall be by{" "}
                {serviceAgreement?.appliedLaw || (
                  <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
                )}{" "}
                <strong>(13)</strong>
                law.
              </li>
              <li>
                <strong>Negotiation.</strong> In the event of a dispute, the
                Parties agree to work towards a resolution through good faith
                negotiation.
              </li>
              <li>
                <strong>Mediation or Binding Arbitration.</strong> In the event
                that a dispute cannot be resolved through good faith
                negotiation, the Parties agree to submit to binding mediation or
                arbitration.
              </li>
              <li>
                <strong>Attorney's Fees.</strong> In the event of Arbitration
                and/or Mediation, the prevailing Party will be entitled to its
                legal fees, including, but not limited to, its attorneys' fees.
              </li>
            </ol>
          </li>
          <li className="mb-6">
            <strong>General.</strong>
            <ol className="pl-6 list-decimal">
              <li>
                <strong>Assignment.</strong> The Parties may not assign their
                rights and/or obligations under this Agreement.
              </li>
              <li>
                <strong>Complete Contract.</strong> This Agreement constitutes
                the Parties entire understanding of their rights and
                obligations. This Agreement supersedes any other written or
                verbal communications between the Parties. Any subsequent
                changes to this Agreement must be made in writing and signed by
                both Parties.
              </li>
              <li>
                <strong>Severability.</strong> If any section of this Agreement
                is found to be invalid, illegal, or unenforceable, the rest of
                this Agreement will still be enforceable.
              </li>
              <li>
                <strong>Waiver.</strong> Neither Party can waive any provision
                of this Agreement, or any rights or obligations under this
                Agreement, unless agreed to in writing. If any provision, right,
                or obligation is waived, it is only waived to the extent agreed
                to in writing.
              </li>
            </ol>
          </li>
          <li className="mb-6">
            <strong>Notices.</strong>
            <p>
              All notices under this Agreement must be sent by email with read
              serviceAgreement requested or by certified or registered mail with
              return serviceAgreement requested. Notices shall be sent as
              follows:
            </p>
            <div className="mb-2 mt-4">
              <strong>Customer</strong>
              <div className="-mt-4 ml-4">
                <br />
                {receiver?.name || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(4)</strong>
                <br />
                {receiver?.email || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(15)</strong>
                <br />
                {receiver?.address || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(5)</strong>
              </div>
            </div>
            <div className="mt-4">
              <strong>Service Provider</strong>
              <div className="-mt-4 ml-4">
                <br />
                {payer?.name || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(2)</strong>
                <br />
                {payer?.email || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(16)</strong>
                <br />
                {payer?.address || (
                  <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"></span>
                )}{" "}
                <strong>(3)</strong>
              </div>
            </div>
          </li>
        </ol>

        {/* Page break */}
        <div className="my-8 break-after-page"></div>

        <div className="mb-6">
          <h2 className=" mt-8">
            The Parties agree to the terms and conditions set forth above as
            demonstrated by their signatures as follows: <strong>(14)</strong>
          </h2>
          <div className="flex flex-col gap-8 mt-4 pl-10">
            <div>
              <strong>Customer</strong>
              <br />
              Signed:{" "}
              <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Name:{" "}
              {receiver?.name || (
                <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              )}
              <br />
              Date:{" "}
              {serviceAgreement?.signature?.clientDate ? (
                new Date(
                  serviceAgreement?.signature?.clientDate
                ).toLocaleDateString("en-US", DATE_OPTIONS)
              ) : (
                <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              )}
            </div>
            <div>
              <strong>Service Provider</strong>
              <br />
              Signed:{" "}
              <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Name:{" "}
              {payer?.name || (
                <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              )}
              <br />
              Date:{" "}
              {serviceAgreement?.signature?.providerDate ? (
                new Date(
                  serviceAgreement?.signature?.providerDate
                ).toLocaleDateString("en-US", DATE_OPTIONS)
              ) : (
                <span className="inline-block min-w-[100px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate3;
