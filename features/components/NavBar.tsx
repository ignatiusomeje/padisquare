"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAppDispatch } from "@/store/hooks";
import { setAppSearch } from "../shop/data/shopSlice";

const NavBar = ({ logo }: INavBarProp) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setAppSearch(debouncedSearch));
  }, [debouncedSearch]);

  return (
    <motion.div
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`backdrop-blur-2xl sticky top-0 z-50 bg-white/50 border-b border-b-gray-200 w-full`}
    >
      <div
        className={`mx-auto max-w-7xl px-3 flex justify-between items-center py-2 gap-3`}
      >
        <Image src={logo} width={120} height={40} alt="logo" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search for products"
          className={`focus:ring-0! border-brand md:block hidden focus:border-brand! max-w-xl text-sm!`}
        />
        <div className={`flex items-center cursor-pointer gap-3 w-fit`}>
          <span className={`relative`}>
            <IoCartOutline className={`text-brand`} size={24} />
            <span
              className={`w-2 h-2 rounded-full bg-red-600 absolute top-0 right-0`}
            ></span>
          </span>

          <FaRegUserCircle className={`text-brand cursor-pointer`} size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;
