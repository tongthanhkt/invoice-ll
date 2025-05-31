import { api } from "@/app/store/api";
import { UseInfo, UseInfoRequest } from "@/types/useInfo";

const userInfoService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoTemplates: builder.query<UseInfo, string>({
      query: (defaultTemplate) => `/user-info-templates?${defaultTemplate}`,
      providesTags: ["payers"],
    }),
    updateUserInfoTemplate: builder.mutation<
      unknown,
      { id: string; data: UseInfoRequest }
    >({
      query: ({ id, data }) => ({
        url: `/user-info-templates/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["payers"],
    }),
    createUserInfoTemplate: builder.mutation<unknown, UseInfoRequest>({
      query: (data) => ({
        url: "/user-info-templates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payers"],
    }),
  }),
});

export const {
  useGetUserInfoTemplatesQuery,
  useUpdateUserInfoTemplateMutation,
  useCreateUserInfoTemplateMutation,
} = userInfoService;
