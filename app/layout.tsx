"use client";
import "@/app/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { InvoiceProvider } from "@/contexts/InvoiceContext";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Provider store={store}>
          <AuthProvider>
            <InvoiceProvider>
              <div className="flex flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </InvoiceProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
