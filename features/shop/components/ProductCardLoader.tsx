import { Skeleton } from "@/components/ui/skeleton";

const ProductCardLoader = () => {
  return (
    <div
      className={`bg-white border border-gray-200 hover:shadow-md rounded-lg group overflow-hidden relative transition-all duration-300`}
    >
      <Skeleton className={`aspect-4/3`} />
      <div className={`flex flex-col p-2 gap-1 flex-1`}>
        <Skeleton className={`w-full h-4`} />
        <div
          className={`mt-auto flex items-center gap-4 justify-between w-full`}
        >
          <Skeleton className={`w-full h-4`} />
          <Skeleton className={`w-full h-4`} />
        </div>
        <div className={`flex items-center gap-4 justify-between w-full`}>
          <Skeleton className={`w-20 h-6`} />
          <Skeleton className={`w-10 h-4`} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardLoader;
