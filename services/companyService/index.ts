import {
  PayerCombined,
  ReceiverCombined,
} from "@/app/components/invoice/InvoiceMain";
import { api } from "@/app/store/api";
import { ICompanyRequest, ICompanyResponse } from "@/types/company";

const invoiceService = api.injectEndpoints({
  endpoints: (builder) => ({
    updateCompany: builder.mutation<void, ICompanyRequest>({
      query: ({ id, ...company }) => ({
        url: `/company`,
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["company"],
    }),
    getCompany: builder.query<ICompanyResponse, void>({
      query: () => "/company",
      providesTags: ["company"],
    }),
  }),
});

export const { useUpdateCompanyMutation, useGetCompanyQuery } = invoiceService;
