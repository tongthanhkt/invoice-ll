import { formatNumberWithCommas } from "@/lib/helpers";
import InvoiceLayout from "./InvoiceLayout";
import { UploadCloud } from "lucide-react";
import { DATE_OPTIONS } from "@/lib/variables";

const InvoiceTemplate13 = (data: any) => {
  const { company, details, shipment } = data || {};
  const totalQuantity = details?.items?.reduce(
    (acc: number, curr: any) => acc + Number(curr.quantity || 0),
    0
  );

  return (
    <InvoiceLayout>
      <div className="bg-white min-h-[1100px] p-8">invoi</div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate13;
