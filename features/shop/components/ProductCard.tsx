import { IoBanOutline, IoCartOutline } from "react-icons/io5";

const ProductCard = ({ product }: { product: IProducts }) => {
  return (
    <div
      className={`bg-white border border-gray-200 hover:shadow-md rounded-lg group overflow-hidden relative transition-all duration-300`}
    >
      <div className={`relative aspect-4/3 overflow-hidden bg-gray-100`}>
        <div
          style={{ backgroundImage: `url(${product.thumbnail})` }}
          className={`absolute group-hover:scale-110 w-full h-full bg-cover bg-center transition-transform duration-500`}
        ></div>
        {product?.brand && (
          <div className={`top-2 left-2 absolute`}>
            <span
              className={`text-[10px] bg-brand rounded-full py-1 px-2 text-white`}
            >
              {product.brand}
            </span>
          </div>
        )}
        <div
          className={`absolute hidden inset-0  p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:flex justify-center items-center bg-linear-to-t from-black/50 to-transparent`}
        >
          <button
            disabled={product.availabilityStatus === "Out of Stock"}
            className={`h-fit bg-brand text-white cursor-pointer font-bold py-2 px-3 rounded-md shadow-md hover:bg-brand/80 disabled:bg-red-200 flex items-center justify-center gap-2 w-fit text-sm`}
          >
            {product.availabilityStatus === "Out of Stock" ? (
              <>
                <IoBanOutline className={`animate-spin`} size={24} />
                {product.availabilityStatus}
              </>
            ) : (
              <>
                <IoCartOutline size={24} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      <div className={`flex flex-col p-2 gap-1 flex-1`}>
        <h3
          className={`text-gray-800 line-clamp-1 font-inter text-lg font-semibold`}
        >
          {product.title}
        </h3>

        <div className={`mt-auto flex items-center justify-between w-full`}>
          <p className={`font-inter font-semibold text-sm`}>
            {product.category}
          </p>
          <p
            className={`font-semibold ${product.availabilityStatus === "Out of Stock" ? `text-red-600` : product.availabilityStatus === "Low Stock" ? `text-yellow-600` : `text-brand`} font-inter text-sm`}
          >
            {product.availabilityStatus}
          </p>
        </div>
        <div className={`flex items-center justify-between w-full`}>
          <button
            disabled={product.availabilityStatus === "Out of Stock"}
            className={`h-fit bg-brand text-white cursor-pointer font-bold py-2 px-3 rounded-md shadow-md hover:bg-brand/80 lg:hidden disabled:bg-red-200 flex items-center justify-center gap-2 w-fit text-sm`}
          >
            {product.availabilityStatus === "Out of Stock" ? (
              <>
                <IoBanOutline className={`animate-spin`} size={24} />
                {product.availabilityStatus}
              </>
            ) : (
              <>
                <IoCartOutline size={24} />
                Add to Cart
              </>
            )}
          </button>
          <p className={`font-bold font-inter ms-auto text-lg`}>
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
