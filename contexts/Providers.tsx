"use client";

import React from "react";
import "@/app/globals.css";
import Header from "@/components/Header";

// RHF
import { FormProvider, useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { InvoiceSchema } from "@/lib/schemas";

// Context
import { ChargesContextProvider } from "@/contexts/ChargesContext";
import { InvoiceContextProvider } from "@/contexts/InvoiceContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";

// Types
import { InvoiceType } from "@/types";

// Variables
import { store } from "@/app/store/store";
import { FORM_DEFAULT_VALUES } from "@/lib/variables";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const form = useForm<InvoiceType>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <FormProvider {...form}>
          <InvoiceContextProvider>
            <ChargesContextProvider>
              <Header />
              <div className="flex flex-col">{children}</div>
            </ChargesContextProvider>
          </InvoiceContextProvider>
        </FormProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
