import {
  PayerCombined,
  ReceiverCombined,
} from "@/app/components/invoice/InvoiceMain";
import { api } from "@/app/store/api";

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
    createReceiver: builder.mutation<
      { id: string; name: string },
      { name: string }
    >({
      query: (receiver) => ({
        url: "/receivers",
        method: "POST",
        body: receiver,
      }),
      invalidatesTags: ["receivers"],
    }),
    createReceiverEmail: builder.mutation<{ email: string }, { email: string }>(
      {
        query: (email) => ({
          url: "/receiver-emails",
          method: "POST",
          body: email,
        }),
        invalidatesTags: ["receivers"],
      }
    ),
    createReceiverAddress: builder.mutation<
      { address: string },
      { address: string }
    >({
      query: (address) => ({
        url: "/receiver-addresses",
        method: "POST",
        body: address,
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
  useCreateReceiverEmailMutation,
  useCreateReceiverAddressMutation,
} = invoiceService;
