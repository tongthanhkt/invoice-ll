import { api } from "@/app/store/api";
import { ClientInfoForm, ClientInfoTemplate } from "@/types/client";

const clientInfoService = api.injectEndpoints({
  endpoints: (builder) => ({
    getClientInfoTemplates: builder.query<ClientInfoTemplate[], string>({
      query: (defaultTemplate) => `/client-info-template?${defaultTemplate}`,
      providesTags: ["client"],
    }),
    createClientInfoTemplate: builder.mutation<unknown, ClientInfoForm>({
      query: (data) => ({
        url: "/client-info-template",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetClientInfoTemplatesQuery,
  useCreateClientInfoTemplateMutation,
} = clientInfoService;
