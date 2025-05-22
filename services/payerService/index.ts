import { api } from "@/app/store/api";
import { Payer, PayerAddress, PayerEmail } from "@/types/invoice";
import { ProfileRequest } from "@/types/profile";

const invoiceService = api.injectEndpoints({
  endpoints: (builder) => ({
    firstPayer: builder.query<
      { payer: Payer; payerEmail: PayerEmail; payerAddress: PayerAddress },
      void
    >({
      query: () => "/first-payer",
      providesTags: ["payers"],
    }),
    updatePayer: builder.mutation<unknown, ProfileRequest>({
      query: (payer) => ({
        url: "/first-payer",
        method: "PUT",
        body: payer,
      }),
      invalidatesTags: ["payers"],
    }),
  }),
});

export const { useFirstPayerQuery, useUpdatePayerMutation } = invoiceService;
