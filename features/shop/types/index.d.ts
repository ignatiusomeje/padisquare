declare interface IShopInitialState {
  products: IProducts[];
  fetchProductsLoading: boolean;
  fetchProductsError: string;
  fetchMoreProductsLoading: boolean;
  fetchMoreProductsError: string;
  skip: null | number;
  totalProducts: number;
  limit: number;
  search: string;
  sort: string;
}

declare interface IProducts {
  id: number;
  title: string;
  category: string;
  price: number;
  brand: string;
  availabilityStatus: string;
  images: string[];
  thumbnail: string;
}

declare interface IGetAllProducts<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

declare interface IGetProducts {
  url: string;
  params: {
    q?: string;
    select?: string;
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  };
}
