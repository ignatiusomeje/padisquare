"use client";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`bg-white w-full `}
    >
      <div className={`mx-auto max-w-7xl w-full px-3 `}>
        <div className={`relative h-100 w-full overflow-hidden rounded-md`}>
          <div
            className={`absolute inset-0 bg-cover bg-center`}
            style={{
              backgroundImage: `url("/headerImage.png")`,
            }}
          ></div>
          <div
            className={`absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent`}
          ></div>
          <div className={`relative flex h-full max-w-2xl md:px-7 px-3 flex-col justify-center`}>
            <h1 className="text-3xl md:text-4xl font-inter font-bold text-white">
              Everything You Need, One Smart Store
            </h1>

            <p className="mt-4 text-white font-inter text-sm max-w-md">
              Discover quality products curated for everyday living. From
              essentials to standout finds, shop with confidence and enjoy
              seamless delivery wherever you are.
            </p>

            <motion.button whileHover={{scale:1.03}} whileTap={{scale: 0.9}} transition={{duration:0.4, ease:"easeInOut"}} className="mt-6 bg-brand font-inter text-sm text-white px-3 py-2 cursor-pointer w-fit rounded-md font-medium hover:bg-[#128a3f] transition">
              Shop the Collection
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
