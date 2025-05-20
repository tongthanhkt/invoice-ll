import { User } from "@/types";
import { api } from "@/app/store/api";
import { LoginCredentials, RegisterData } from "../auth/authService";

const authService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<{ user: User }, void>({
      query: () => "auth/me",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (data: Partial<User>) => ({
        url: "auth/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    login: builder.mutation<{ token: string; user: User }, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<{ token: string; user: User }, RegisterData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    createBusiness: builder.mutation<
      {
        message: string;
        payer: string;
        email: string;
        address: string;
      },
      { name: string; email: string; address: string; userId: string }
    >({
      query: (business) => ({
        url: "/auth/business",
        method: "POST",
        body: business,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCreateBusinessMutation,
} = authService;
