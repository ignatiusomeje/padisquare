import { useAppSelector } from "@/store/hooks";
import { BiPackage } from "react-icons/bi";

const ProductNotFound = () => {
  const sort = useAppSelector((state) => state.Shop.sort);
  const search = useAppSelector((state) => state.Shop.search);
  return (
    <div className={`w-full flex items-center justify-center h-100`}>

    <div className={`w-full flex flex-col items-center justify-center gap-3`}>
      <BiPackage size={50} className={`text-brand`} />
      <h3 className={`text-black font-inter font-bold text-3xl`}>
        No Product found
      </h3>
      <p className={`font-inter font-semibold text-sm text-gray-400 max-w-2xl mx-auto text-center`}>
        {search || sort
          ? `Try adjusting your search or filters to find what you're looking for. ${search && `We couldn't find any matches for "${search}" with your current filters.`} `
          : `No product found in this store`}
      </p>
    </div>
    </div>
  );
};

export default ProductNotFound;
