"use client";
import { useAppDispatch } from "@/store/hooks";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";
import ProductCardsLoader from "./ProductCardsLoader";
import { LuLoaderCircle } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setAppSort } from "../data/shopSlice";
import { Input } from "@/components/ui/input";
import ProductNotFound from "./ProductNotFound";
import ProductError from "./ProductError";
import { useAppSearch } from "@/hooks/useSearch";
import { useFetchProduct } from "@/hooks/useFetchProduct";

const ProductCards = () => {
  const dispatch = useAppDispatch();
  const {
    fetchMoreProductsLoading,
    fetchProductsError,
    fetchProductsLoading,
    ref,
    sort,
    products,
  } = useFetchProduct();
  const { search, setSearch } = useAppSearch();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return fetchProductsLoading ? (
    <ProductCardsLoader />
  ) : fetchProductsError ? (
    <ProductError />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={`w-full flex flex-col gap-3 mx-auto max-w-7xl px-3`}
    >
      <div className={`w-full flex flex-col gap-2`}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search for products"
          className={`focus:ring-0! border-brand md:hidden focus:border-brand! max-w-xl text-sm!`}
        />
        <div className={`flex items-center w-full md:w-fit gap-3 md:ms-auto`}>
          <span className={`font-inter shrink-0 text-gray-400`}>Sort By:</span>
          <Select
            defaultValue="recent"
            value={sort}
            onValueChange={(e) => dispatch(setAppSort(e))}
          >
            <SelectTrigger className={`w-full max-w-50 focus:ring-0!`}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent position={"popper"}>
              <SelectGroup>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="low">Price (low - high)</SelectItem>
                <SelectItem value="high">Price (high - low)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <motion.div
          className={` w-full gap-3 grid ${products.length < 5 ? `grid-cols-[repeat(auto-fit,minmax(230px,230px))]` : `grid-cols-[repeat(auto-fit,minmax(230px,1fr))]`}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <AnimatePresence key={index} mode="wait">
              <motion.div
                key={product.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                {...(index === products.length - 1 && { ref: ref })}
              >
                <ProductCard product={product} />{" "}
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      )}
      {fetchMoreProductsLoading && (
        <LuLoaderCircle
          size={24}
          className={`text-brand col-auto mx-auto animate-spin`}
        />
      )}
    </motion.div>
  );
};

export default ProductCards;
