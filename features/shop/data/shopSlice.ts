import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { returnError } from "@/store/ErrorHandler";
import { fetchMoreProducts, fetchProducts } from "./shopAPI";

const initialState: IShopInitialState = {
  products: [],
  fetchProductsLoading: false,
  fetchProductsError: "",
  fetchMoreProductsLoading: false,
  fetchMoreProductsError: "",
  skip: null,
  totalProducts: 0,
  limit: 20,
  search: "",
  sort: "recent",
};

const shopSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSkip: (state, action: PayloadAction<null | number>) => {
      state.skip = action.payload;
    },
    setAppSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setAppSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* fetch Products */
    builder.addMatcher(fetchProducts.matchPending, (state) => {
      state.fetchProductsLoading = true;
    });
    builder.addMatcher(
      fetchProducts.matchFulfilled,
      (state, action: PayloadAction<IGetAllProducts<IProducts>>) => {
        state.fetchProductsLoading = false;
        state.products = action.payload.products;
        state.skip = action.payload.skip;
        state.totalProducts = action.payload.total;
      },
    );
    builder.addMatcher(
      fetchProducts.matchRejected,
      (
        state,
        action: PayloadAction<
          (FetchBaseQueryError & { data?: unknown }) | undefined
        >,
      ) => {
        state.fetchProductsLoading = false;
        state.fetchProductsError = returnError(action);
      },
    );

    builder.addMatcher(fetchMoreProducts.matchPending, (state) => {
      state.fetchMoreProductsLoading = true;
    });
    builder.addMatcher(
      fetchMoreProducts.matchFulfilled,
      (state, action: PayloadAction<IGetAllProducts<IProducts>>) => {
        state.fetchMoreProductsLoading = false;
        state.products = [...state.products, ...action.payload.products];
        state.skip = action.payload.skip;
        state.totalProducts = action.payload.total;
      },
    );
    builder.addMatcher(
      fetchMoreProducts.matchRejected,
      (
        state,
        action: PayloadAction<
          (FetchBaseQueryError & { data?: unknown }) | undefined
        >,
      ) => {
        state.fetchMoreProductsLoading = false;
        state.fetchMoreProductsError = returnError(action);
      },
    );
  },
});

export const { setSkip, setAppSearch, setAppSort } = shopSlice.actions;

export default shopSlice.reducer;
