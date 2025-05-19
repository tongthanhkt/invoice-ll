import { User } from "@/types";
import { api } from "@/app/store/api";
import {
  PayerCombined,
  ReceiverCombined,
} from "@/app/components/invoice/InvoiceMain";

const invoiceService = api.injectEndpoints({
  endpoints: (builder) => ({
    combinedPayers: builder.query<PayerCombined, void>({
      query: () => "/payers-combined",
      providesTags: ["payers"],
    }),
    createPayer: builder.mutation<
      { id: string; name: string },
      { name: string }
    >({
      query: (payer) => ({
        url: "/payers",
        method: "POST",
        body: payer,
      }),
      invalidatesTags: ["payers"],
    }),
    createPayerEmail: builder.mutation<{ email: string }, { email: string }>({
      query: (email) => ({
        url: "/payer-emails",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["payers"],
    }),
    createPayerAddress: builder.mutation<
      { address: string },
      { address: string }
    >({
      query: (address) => ({
        url: "/payer-addresses",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["payers"],
    }),
    combinedReceivers: builder.query<ReceiverCombined, void>({
      query: () => "/receivers-combined",
      providesTags: ["receivers"],
    }),
    createReceiver: builder.mutation<{ name: string }, string>({
      query: (receiver) => ({
        url: "/receivers",
        method: "POST",
        body: receiver,
      }),
      invalidatesTags: ["receivers"],
    }),
  }),
});

export const {
  useCombinedPayersQuery,
  useCombinedReceiversQuery,
  useCreatePayerMutation,
  useCreateReceiverMutation,
  useCreatePayerEmailMutation,
  useCreatePayerAddressMutation,
} = invoiceService;
