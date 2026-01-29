import { ShopAPI } from "@/store/ShopAPI";

const shopAPI = ShopAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchProducts: build.query<IGetAllProducts<IProducts>, IGetProducts>({
      query: ({ ...products }) => ({
        url: `${products.url}`,
        method: "Get",
        params: products.params,
      }),
    }),

    fetchMoreProducts: build.query<IGetAllProducts<IProducts>, IGetProducts>({
      query: ({ ...products }) => ({
        url: `${products.url}`,
        method: "Get",
        params: products.params,
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useLazyFetchMoreProductsQuery } = shopAPI;
export const { fetchMoreProducts, fetchProducts } = shopAPI.endpoints;
