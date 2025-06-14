import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const InvoiceContainer = ({
  title,
  invoiceLabel,
  children,
}: {
  title: string;
  invoiceLabel?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto sm:px-6">
      <div className="border border-solid border-neutral-200 rounded-lg bg-white">
        <CardHeader className="border-b border-border/40 bg-white p-4">
          <div className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-3">
              <span className="text-lg font-semibold tracking-tight text-gray-800">
                {title}
              </span>
            </CardTitle>
            {invoiceLabel && (
              <Badge
                variant="secondary"
                className="h-9 rounded-full px-3 bg-gray-50 self-start sm:self-auto hover:bg-gray-50"
              >
                <p className="text-sm font-medium text-gray-900">
                  {invoiceLabel}
                </p>
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 sn:pb-10 bg-white  h-[calc(100vh_-_400px)] sm:h-[calc(100vh_-_196px)] overflow-y-auto rounded-b-lg">
          {children}
        </CardContent>
      </div>
    </div>
  );
};
