import { api } from "@/app/store/api";
import { Provider, ProviderRequest } from "@/types/provider";

const providerService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query<Provider[], string>({
      query: (defaultTemplate) => `/provider?${defaultTemplate}`,
      providesTags: ["provider"],
    }),
    createProvider: builder.mutation<Provider, ProviderRequest>({
      query: (data) => ({
        url: "/provider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["provider"],
    }),
  }),
});

export const { useGetProvidersQuery, useCreateProviderMutation } =
  providerService;
