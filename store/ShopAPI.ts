import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ShopAPI = createApi({
  reducerPath: `shopApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  // tagTypes: ["encounters"],
  endpoints: () => ({}),
});
