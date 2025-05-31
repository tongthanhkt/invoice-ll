import { api } from "@/app/store/api";
import { Payer, PayerAddress, PayerEmail } from "@/types/invoice";
import { ProfileRequest } from "@/types/profile";

const userInfoService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoTemplates: builder.query<
      { payer: Payer; payerEmail: PayerEmail; payerAddress: PayerAddress },
      string
    >({
      query: (defaultTemplate) => `/user-info-templates?${defaultTemplate}`,
      providesTags: ["payers"],
    }),
    updateUserInfoTemplate: builder.mutation<unknown, ProfileRequest>({
      query: () => ({
        url: "/user-info-templates",
        method: "GET",
      }),
      invalidatesTags: ["payers"],
    }),
  }),
});

export const {
  useGetUserInfoTemplatesQuery,
  useUpdateUserInfoTemplateMutation,
} = userInfoService;
