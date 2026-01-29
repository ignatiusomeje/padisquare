"use client";
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";

const ProductError = () => {
  return (
    <div
      className={`w-full max-w-7xl mx-auto flex items-center justify-center md:h-100 px-3 py-5`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`border border-gray-200 rounded-md bg-white px-3 md:px-5 py-10 w-full max-w-xl h-fit flex flex-col gap-4`}
      >
        <span
          className={`h-15 w-15 rounded-full bg-brand/50 flex items-center justify-center mx-auto`}
        >
          <RiErrorWarningFill size={56} className={`text-brand`} />
        </span>
        <h3
          className={`font-inter text-4xl text-center font-bold text-black/90`}
        >
          Something went wrong
        </h3>
        <p
          className={`font-inter text-sm text-gray-400 font-semibold max-w-2xl mx-auto text-center`}
        >
          We&apos;re having trouble loading the products right now. Please check
          your connection and try again.
        </p>
      </motion.div>
    </div>
  );
};

export default ProductError;
