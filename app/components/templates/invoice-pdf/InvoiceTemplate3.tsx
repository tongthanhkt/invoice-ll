import React from "react";
import InvoiceLayout from "./InvoiceLayout";

const InvoiceTemplate3 = () => {
  return (
    <InvoiceLayout>
      <div style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        <h1 className="text-center font-bold mb-6 text-2xl">
          Service Agreement
        </h1>
        <p>
          This Service Agreement (the <strong>"Agreement")</strong> is entered
          into{" "}
          <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
          (the <strong>"Effective Date")</strong>) by and between{" "}
          <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
          (the <strong>"Customer")</strong>) located at{" "}
          <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
          and{" "}
          <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
          (the <strong>"Service Provider")</strong>) located at{" "}
          <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
          , also individually referred to as the <strong>"Party"</strong>, and
          collectively the <strong>"Parties"</strong>.
        </p>

        <ol className="pl-6 text-base list-decimal">
          <li className="mb-6">
            <strong>Services.</strong> The Service Provider shall perform the
            services listed in this Section 1 (the "Services").
            <ol className="pl-6 list-decimal">
              <li>
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              </li>
              <li>
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              </li>
              <li>
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              </li>
            </ol>
          </li>
          <li className="mb-6">
            <strong>Compensation.</strong> The Customer agrees to pay the
            Service Provider $
            <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
            as payment for the Services provided. This fee will be paid in
            accordance with the following schedule:
            <ul className="pl-6 list-disc">
              <li>
                Total Cost of the Services:{" "}
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              </li>
              <li>
                Amount Due at Signing:{" "}
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              </li>
              <li>
                Amount Due at Completion:{" "}
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
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
            <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
            days. Invoices shall be paid within{" "}
            <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
            days from the date of the invoice. Payments may be made by credit
            card/electronic transfer/check as follows:
            <ul className="pl-6 list-disc">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
                </li>
              ))}
            </ul>
          </li>
          <li className="mb-6">
            <strong>Term.</strong> The term of this Agreement shall commence on
            the Effective Date, as stated above, and continue for{" "}
            <span className="inline-block min-w-[80px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
            days/months/years, unless otherwise terminated per the terms of this
            Agreement.
          </li>
          <li className="mb-6">
            <strong>Termination.</strong>
            <ol className="pl-6 list-decimal">
              <li>
                Either Party may terminate the Agreement at any time upon{" "}
                <span className="inline-block min-w-[40px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
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
                <strong>Choice of Law.</strong> ... this Agreement shall be
                governed by{" "}
                <span className="inline-block min-w-[120px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>{" "}
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
              receipt requested or by certified or registered mail with return
              receipt requested. Notices shall be sent as follows:
            </p>
            <div className="mb-2">
              <strong>Customer</strong>
              <br />
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"
                ></span>
              ))}
            </div>
            <div>
              <strong>Service Provider</strong>
              <br />
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle my-1 block"
                ></span>
              ))}
            </div>
          </li>
        </ol>

        {/* Page break */}
        <div className="my-8 break-after-page"></div>

        <div className="mb-6">
          <p>
            <em>
              [The remainder of this page is intentionally left blank. Signature
              page follows.]
            </em>
          </p>
          <h2 className="text-lg font-bold mt-8 mb-4">Signatures</h2>
          <div className="flex flex-row justify-between gap-8 mt-8">
            <div>
              <strong>Customer</strong>
              <br />
              Signed:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Name:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Date:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
            </div>
            <div>
              <strong>Service Provider</strong>
              <br />
              Signed:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Name:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
              <br />
              Date:{" "}
              <span className="inline-block min-w-[200px] border-b border-gray-700 h-[1.2em] align-middle mx-1"></span>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate3;
