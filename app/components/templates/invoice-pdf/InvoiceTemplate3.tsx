import React from "react";
import InvoiceLayout from "./InvoiceLayout";

const ReceiptTemplate = () => {
  return (
    <InvoiceLayout>
      <h1>Service Agreement</h1>
      <p>
        This Service Agreement (the “Agreement”) is entered into{" "}
        <strong>___________________</strong> (the “Effective Date”) by and
        between <strong>____________________</strong> (the “Customer”) located
        at <strong>_________________________</strong> and{" "}
        <strong>___________________</strong> (the “Service Provider”) located at{" "}
        <strong>___________________________</strong>, also individually referred
        to as the “Party”, and collectively the “Parties”.
      </p>
      <div className="section">
        <strong>1. Services.</strong> The Service Provider shall perform the
        services listed in this Section 1 (the “Services”).
        <ol type="1">
          <li>___________________________________________________________</li>
          <li>___________________________________________________________</li>
          <li>___________________________________________________________</li>
        </ol>
      </div>
      <div className="section">
        <strong>2. Compensation.</strong> The Customer agrees to pay the Service
        Provider $<strong>____________________</strong> as payment for the
        Services provided. This fee will be paid in accordance with the
        following schedule:
        <br />
        <ul>
          <li>Total Cost of the Services: ___________________________</li>
          <li>Amount Due at Signing: ___________________________</li>
          <li>Amount Due at Completion: ___________________________</li>
        </ul>
      </div>
      <div className="section">
        <strong>3. Expenses.</strong> The Customer agrees to reimburse the
        Service Provider for all expenses incurred as a result of performing the
        Services...
      </div>
      <div className="section">
        <strong>4. Payment.</strong> The Service Provider shall submit an
        invoice to the Customer every ___ days. Invoices shall be paid within
        ____ days from the date of the invoice.
        <p>Payments may be made by:</p>
        <ul>
          <li>__________________________________</li>
          <li>__________________________________</li>
          <li>__________________________________</li>
          <li>__________________________________</li>
          <li>__________________________________</li>
        </ul>
      </div>
      <div className="section">
        <strong>5. Term.</strong> This Agreement shall commence on the Effective
        Date and continue for ___________ days/months/years, unless otherwise
        terminated...
      </div>

      <div className="section">
        <strong>6. Termination.</strong>
        <ol type="1">
          <li>
            Either Party may terminate the Agreement upon __ days written
            notice...
          </li>
          <li>
            This Agreement will automatically terminate when both Parties have
            performed all obligations...
          </li>
        </ol>
      </div>

      <div className="section">
        <strong>7. Relationship of the Parties.</strong>
        <ol type="1">
          <li>
            <strong>No Exclusivity:</strong> The Parties understand this
            Agreement is not an exclusive arrangement...
          </li>
          <li>
            <strong>Independent Contractor:</strong> The Service Provider is an
            independent contractor...
          </li>
        </ol>
      </div>

      <div className="section">
        <strong>8. Dispute Resolution.</strong>
        <ol type="1">
          <li>
            <strong>Choice of Law:</strong> This Agreement shall be governed by
            ______________________ law.
          </li>
          <li>
            <strong>Negotiation:</strong> The Parties agree to resolve disputes
            through good faith negotiation.
          </li>
          <li>
            <strong>Mediation/Arbitration:</strong> If unresolved, disputes
            shall be submitted to mediation or arbitration.
          </li>
          <li>
            <strong>Attorney’s Fees:</strong> The prevailing Party shall be
            entitled to legal fees.
          </li>
        </ol>
      </div>
      <div className="section">
        <strong>9. General.</strong>
        <ol type="1">
          <li>
            <strong>Assignment:</strong> No Party may assign this Agreement.
          </li>
          <li>
            <strong>Complete Contract:</strong> This Agreement is the entire
            understanding...
          </li>
          <li>
            <strong>Severability:</strong> If any section is invalid, the rest
            remains enforceable.
          </li>
          <li>
            <strong>Waiver:</strong> Must be in writing to be valid.
          </li>
        </ol>
      </div>

      <div className="section">
        <strong>10. Notices.</strong>
        All notices under this Agreement must be sent by email (read receipt) or
        registered mail. Notices shall be sent to:
        <p>
          <strong>Customer</strong>
          <br />
          ______________________________
          <br />
          ______________________________
          <br />
          ______________________________
          <br />
          ______________________________
        </p>
        <p>
          <strong>Service Provider</strong>
          <br />
          ______________________________
          <br />
          ______________________________
          <br />
          ______________________________
          <br />
          ______________________________
        </p>
      </div>

      <div className="page-break"></div>
      <div className="section">
        <p>
          <em>
            [The remainder of this page is intentionally left blank. Signature
            page follows.]
          </em>
        </p>

        <h2>Signatures</h2>

        <div className="signature-block">
          <p>
            <strong>Customer</strong>
            <br />
            Signed: ________________________________
            <br />
            Name: _________________________________
            <br />
            Date: _________________________________
          </p>

          <div className="signature"></div>

          <p>
            <strong>Service Provider</strong>
            <br />
            Signed: ________________________________
            <br />
            Name: _________________________________
            <br />
            Date: _________________________________
          </p>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default ReceiptTemplate;
