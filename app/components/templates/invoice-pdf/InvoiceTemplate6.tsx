import React from "react";
import InvoiceLayout from "./InvoiceLayout";
import { DATE_OPTIONS } from "@/lib/variables";
import { formatNumberToPercent, formatNumberWithCommas } from "@/lib/helpers";

const InvoiceTemplate6 = (data: any) => {
  const { saleContract, provider, receiver, details } = data;
  return (
    <InvoiceLayout>
      <div
        style={{
          background: "#fff",
          color: "#111",
          fontFamily: "Times New Roman, Times, serif",
          padding: 40,
          minHeight: 1100,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
            marginBottom: 32,
          }}
        >
          SALES CONTRACT
        </h1>
        {/* PARTIES */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            PARTIES
          </div>
          <div style={{ marginBottom: 8 }}>
            This Sales Contract (hereinafter referred to as the{" "}
            <b>"Contract"</b>) is entered into on{" "}
            <b>
              {saleContract?.invoiceDate
                ? new Date(saleContract.invoiceDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )
                : "__________"}
            </b>{" "}
            (the <b>"Effective Date"</b>), by and between{" "}
            <b>{provider?.name || "______________"}</b>, with an address of{" "}
            <b>{provider?.address || "______________"}</b> (hereinafter referred
            to as the <b>"Seller"</b>) and{" "}
            <b>{receiver?.name || "______________"}</b>, with an address of{" "}
            <b>{receiver?.address || "______________"}</b> (hereinafter referred
            to as the <b>"Customer"</b>) (collectively referred to as the{" "}
            <b>"Parties"</b>).
          </div>
        </div>
        {/* GOODS AND PRICE */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            GOODS AND PRICE
          </div>
          <div style={{ marginBottom: 8 }}>
            The goods that the Seller is selling to the Customer are enlisted
            below with their quantities (hereinafter referred to as the{" "}
            <b>"Goods"</b>).
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 16,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: 6,
                    background: "#f5f5f5",
                  }}
                >
                  Good
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: 6,
                    background: "#f5f5f5",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: 6,
                    background: "#f5f5f5",
                  }}
                >
                  Price per unit
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: 6,
                    background: "#f5f5f5",
                  }}
                >
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {details?.items && details?.items.length > 0
                ? details?.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid #222", padding: 6 }}>
                        {item?.description || ""}
                      </td>
                      <td
                        style={{
                          border: "1px solid #222",
                          padding: 6,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity || ""}
                      </td>
                      <td
                        style={{
                          border: "1px solid #222",
                          padding: 6,
                          textAlign: "right",
                        }}
                      >
                        {formatNumberWithCommas(item?.unitPrice || 0) || ""}
                      </td>
                      <td
                        style={{
                          border: "1px solid #222",
                          padding: 6,
                          textAlign: "right",
                        }}
                      >
                        {formatNumberWithCommas(item?.total || 0) || ""}
                      </td>
                    </tr>
                  ))
                : Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid #222", padding: 6 }}>
                        &nbsp;
                      </td>
                      <td style={{ border: "1px solid #222", padding: 6 }}>
                        &nbsp;
                      </td>
                      <td style={{ border: "1px solid #222", padding: 6 }}>
                        &nbsp;
                      </td>
                      <td style={{ border: "1px solid #222", padding: 6 }}>
                        &nbsp;
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {/* PRICE AND PAYMENTS */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            PRICE AND PAYMENTS
          </div>
          <ul style={{ marginLeft: 24, marginBottom: 0, paddingLeft: 0 }}>
            <li style={{ marginBottom: 6 }}>
              The Seller hereby agrees to sell the Goods to the Customer for an
              amount of{" "}
              <b>
                {saleContract?.paymentDueDays
                  ? formatNumberWithCommas(saleContract.paymentDueDays)
                  : "______________"}
              </b>
              .
            </li>
            <li style={{ marginBottom: 6 }}>
              The Seller will provide an invoice to the Customer at the time of
              the delivery.
            </li>
            <li style={{ marginBottom: 6 }}>
              All invoices are to be paid in full at least within thirty (30)
              days.
            </li>
            <li style={{ marginBottom: 6 }}>
              Any balances not paid within thirty (30) days will be subject to a{" "}
              {formatNumberToPercent(saleContract?.lateFeePercent)} (
              {saleContract?.lateFeePercent}%) late payment penalty.
            </li>
          </ul>
        </div>
        {/* DELIVERY AND SHIPPING */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            DELIVERY AND SHIPPING
          </div>
          <ul style={{ marginLeft: 24, marginBottom: 0, paddingLeft: 0 }}>
            <li style={{ marginBottom: 6 }}>
              The delivery of the goods (hereinafter referred to as the{" "}
              <b>"Delivery"</b>) will be at the location{" "}
              <b>{saleContract?.deliveryAddress || "______________"}</b>.
            </li>
            <li style={{ marginBottom: 6 }}>
              The shipping method will be decided by the{" "}
              <b>{saleContract?.shippingMethodDecidedBy || "______________"}</b>{" "}
              and{" "}
              <b>
                {saleContract?.shippingCostResponsibility || "______________"}
              </b>{" "}
              will be responsible for the costs of the shipment.
            </li>
          </ul>
        </div>
        {/* WARRANTIES */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            WARRANTIES
          </div>
          <ul style={{ marginLeft: 24, marginBottom: 0, paddingLeft: 0 }}>
            <li style={{ marginBottom: 6 }}>
              Except as expressly set forth in this Agreement, the Parties
              acknowledge and agree that the Goods are provided as is.
            </li>
            <li style={{ marginBottom: 6 }}>
              Except for the express warranties set forth herein, neither party
              makes any representations or grants any warranties, express or
              implied, either in fact or by operation of law, by statute or
              otherwise, and each party specifically disclaims any other
              warranties, whether written or oral, or express or implied,
              including any warranty of quality, merchantability, or fitness for
              a particular use or purpose or any warranty as to the validity of
              any patents or the noninfringement of any intellectual property
              rights of third parties.
            </li>
          </ul>
        </div>
        {/* INSPECTION */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            INSPECTION
          </div>
          <div style={{ marginLeft: 24 }}>
            Hereby, the Customer acknowledges that it has relied solely on the
            investigations, examinations, and inspections that the Customer has
            chosen to make and that the Seller has afforded the Customer the
            opportunity for full and complete investigations, examinations, and
            inspections.
          </div>
        </div>
        {/* RISK OF LOSS AND TITLE */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            RISK OF LOSS AND TITLE
          </div>
          <ul style={{ marginLeft: 24, marginBottom: 0, paddingLeft: 0 }}>
            <li style={{ marginBottom: 6 }}>
              The risk of loss or damage for the goods will be on the Seller
              until the goods pass upon delivery to the Customer or its
              designee.
            </li>
            <li style={{ marginBottom: 6 }}>
              The Title of the goods will also remain with the Seller until the
              goods pass upon delivery to the Customer or its designee.
            </li>
          </ul>
        </div>
        {/* DELAY OR FAILURE TO PERFORM AND FORCE MAJEURE */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            DELAY OR FAILURE TO PERFORM AND FORCE MAJEURE
          </div>
          <div style={{ marginLeft: 24 }}>
            Under no circumstances will the Seller be held liable to the
            Customer for any delay that may occur, non-delivery or an arising
            fault of this Agreement that may be due to any labour dispute,
            shortage in transportation, delay or shortage of materials to
            produce the Goods, fires, accidents, Acts of God, or any other
            causes outside Seller's control. The Seller will notify the Customer
            immediately upon realization that it will not be able to deliver the
            Goods as promised. Upon such notice, either Party may terminate this
            Agreement.
          </div>
        </div>
        {/* TERMINATION */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            TERMINATION
          </div>
          <div style={{ marginLeft: 24 }}>
            This Agreement may be terminated by either party or both Parties at
            any instant provided that the terminating party provides a written
            notice of termination{" "}
            <b>{saleContract?.terminationNoticeDays || "______________"}</b>{" "}
            days in advance.
          </div>
        </div>
        {/* LIMITATION OF LIABILITY */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            LIMITATION OF LIABILITY
          </div>
          <div style={{ marginLeft: 24 }}>
            Under no circumstances will the Seller be liable for any indirect,
            special, consequential, or punitive damages (including lost profits)
            arising out of or relating to this Agreement or the transactions it
            contemplates (whether for breach of contract, tort, negligence, or
            other form of action).
          </div>
        </div>
        {/* GOVERNING LAW */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            GOVERNING LAW
          </div>
          <div style={{ marginLeft: 24 }}>
            This Agreement shall be governed by and construed in accordance with
            the laws of <b>{saleContract?.governingLaw || "______________"}</b>.
          </div>
        </div>
        {/* AMENDMENTS */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            AMENDMENTS
          </div>
          <ul style={{ marginLeft: 24, marginBottom: 0, paddingLeft: 0 }}>
            <li style={{ marginBottom: 6 }}>
              The Parties agree that any amendments made to this Agreement must
              be in writing, where they must be signed by both Parties to this
              Agreement.
            </li>
            <li style={{ marginBottom: 6 }}>
              Accordingly, any amendments made by the Parties will be applied to
              this Agreement.
            </li>
          </ul>
        </div>
        {/* SEVERABILITY */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            SEVERABILITY
          </div>
          <div style={{ marginLeft: 24 }}>
            In the event that any provision of this Agreement is found to be
            void and unenforceable by a court of competent jurisdiction, then
            the remaining provisions will remain in force in accordance with the
            Parties' intention.
          </div>
        </div>
        {/* ENTIRE AGREEMENT */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            ENTIRE AGREEMENT
          </div>
          <div style={{ marginLeft: 24 }}>
            This Agreement contains the entire agreement and understanding among
            the Parties hereto with respect to the subject matter hereof, and
            supersedes all prior agreements, understandings, inducements and
            conditions, express or implied, oral or written, of any nature
            whatsoever with respect to the subject matter hereof. The express
            terms hereof control and supersede any course of performance and/or
            usage of the trade inconsistent with any of the terms hereof.
          </div>
        </div>
        {/* FORCE MAJEURE */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            FORCE MAJEURE
          </div>
          <div style={{ marginLeft: 24 }}>
            The Seller will not be liable for delays in performance or for
            non-performance due to unforeseen circumstances or causes beyond the
            Seller's reasonable control.
          </div>
        </div>
        {/* SIGNATURE AND DATE */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: 8,
            }}
          >
            SIGNATURE AND DATE
          </div>
          <div style={{ marginLeft: 24 }}>
            The Parties hereby agree to the terms and conditions set forth in
            this Agreement and such is demonstrated throughout their signatures
            below:
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <div style={{ width: "45%" }}>
                <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                  CUSTOMER
                </div>
                <div>
                  Name:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    {receiver?.name || ""}
                  </span>
                </div>
                <div style={{ marginTop: 16 }}>
                  Signature:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    &nbsp;
                  </span>
                </div>
                <div style={{ marginTop: 16 }}>
                  Date:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    {saleContract?.signature?.customerDate
                      ? new Date(
                          saleContract.signature.customerDate
                        ).toLocaleDateString("en-US", DATE_OPTIONS)
                      : ""}
                  </span>
                </div>
              </div>
              <div style={{ width: "45%" }}>
                <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                  SELLER
                </div>
                <div>
                  Name:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    {provider?.name || ""}
                  </span>
                </div>
                <div style={{ marginTop: 16 }}>
                  Signature:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    &nbsp;
                  </span>
                </div>
                <div style={{ marginTop: 16 }}>
                  Date:{" "}
                  <span
                    style={{
                      borderBottom: "1px solid #222",
                      minWidth: 120,
                      display: "inline-block",
                    }}
                  >
                    {saleContract?.signature?.providerDate
                      ? new Date(
                          saleContract.signature.providerDate
                        ).toLocaleDateString("en-US", DATE_OPTIONS)
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate6;
