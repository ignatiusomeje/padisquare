import {
  useFetchProductsQuery,
  useLazyFetchMoreProductsQuery,
} from "@/features/shop/data/shopAPI";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useFetchProduct() {
  const products = useAppSelector((state) => state.Shop.products);
  const fetchProductsError = useAppSelector(
    (state) => state.Shop.fetchProductsError,
  );
  const fetchProductsLoading = useAppSelector(
    (state) => state.Shop.fetchProductsLoading,
  );
  const totalProducts = useAppSelector((state) => state.Shop.totalProducts);
  const limit = useAppSelector((state) => state.Shop.limit);
  const fetchMoreProductsLoading = useAppSelector(
    (state) => state.Shop.fetchMoreProductsLoading,
  );
  const sort = useAppSelector((state) => state.Shop.sort);
  const AppSearch = useAppSelector((state) => state.Shop.search);

  const [FetchMoreProductsQuery] = useLazyFetchMoreProductsQuery();

  useFetchProductsQuery({
    url: AppSearch ? `/search` : `/`,
    params: {
      limit: limit,
      // ...(skip && { skip }),
      ...(AppSearch && { q: AppSearch }),
      ...(sort && {
        order: sort === `low` ? `asc` : sort === `high` ? `desc` : `desc`,
        sortBy:
          sort === `low`
            ? `price`
            : sort === `high`
              ? `price`
              : `meta.createdAt`,
      }),
      select: `title,category,price,brand,availabilityStatus,images,thumbnail,meta`,
    },
  });

  const { inView, ref } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;
    if (fetchMoreProductsLoading) return;
    if (products.length >= totalProducts) return;

    FetchMoreProductsQuery({
      url: AppSearch ? `/search` : `/`,
      params: {
        limit,
        skip: products.length,
        ...(AppSearch && { q: AppSearch }),
        ...(sort && {
          order: sort === `low` ? `asc` : sort === `high` ? `desc` : `desc`,
          sortBy:
            sort === `low`
              ? `price`
              : sort === `high`
                ? `price`
                : `meta.createdAt`,
          select: `title,category,price,brand,availabilityStatus,images,thumbnail,meta`,
        }),
      },
    });
  }, [inView]);

  return {
    ref,
    fetchMoreProductsLoading,
    fetchProductsError,
    fetchProductsLoading,
    sort,
    products,
  };
}
