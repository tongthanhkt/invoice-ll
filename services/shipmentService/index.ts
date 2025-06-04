import { api } from "@/app/store/api";
import { ShipmentForm, ShipmentTemplate } from "@/types/shipment";

const shipmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    getShipmentTemplates: builder.query<ShipmentTemplate[], string>({
      query: (defaultTemplate) => `/shipments?${defaultTemplate}`,
      providesTags: ["shipment"],
    }),
    createShipmentTemplate: builder.mutation<unknown, ShipmentForm>({
      query: (data) => ({
        url: "/shipments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["shipment"],
    }),
  }),
});

export const {
  useGetShipmentTemplatesQuery,
  useCreateShipmentTemplateMutation,
} = shipmentService;
