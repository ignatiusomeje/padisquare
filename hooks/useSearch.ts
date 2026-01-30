import { setAppSearch } from "@/features/shop/data/shopSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useAppSearch() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setAppSearch(debouncedSearch));
  }, [debouncedSearch]);

  return { search, setSearch };
}
