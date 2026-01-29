import { Skeleton } from "@/components/ui/skeleton";
import ProductCardLoader from "./ProductCardLoader";

const ProductCardsLoader = () => {
  return (
    <div className={`w-full flex flex-col gap-3 mx-auto max-w-7xl px-3`}>
      <div className={`w-full flex flex-col md:flex-row md:justify-end gap-2`}>
        <Skeleton className={`md:hidden max-w-xl w-full h-10`} />
        <div className={`flex items-center gap-3 md:ml-auto w-auto`}>
          <Skeleton className={`w-10 h-10`} />
          <Skeleton className={`w-48 h-10`} />
        </div>
      </div>
      <div
        className={`w-full gap-3 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]`}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
          <ProductCardLoader key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardsLoader;
