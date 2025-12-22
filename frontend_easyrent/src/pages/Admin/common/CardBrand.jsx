import { motion } from "motion/react";
import Header from "./common/Header";
import { WiStars } from "react-icons/wi";
import { BsEyeglasses } from "react-icons/bs";
import { IoGlassesSharp } from "react-icons/io5";
import { IoGlasses } from "react-icons/io5";
import { IoGlassesOutline } from "react-icons/io5";
import AdminLayout from './AdminLayout'
import { Link } from "@inertiajs/react";


// eslint-disable-next-line react/prop-types
function CardProduct({ name, icon: Icon, path }) {
  return (
    <Link href={path}>
      <motion.div
        className="flex flex-col overflow-hidden shadow-sm rounded-xl border border-gray-100 bg-white px-5 py-4 sm:p-6 hover:border-gray-200 transition-all duration-300 relative group"
        whileHover={{
          y: -5,
          scale: 1.02,
          boxShadow: "0 10px 20px -10px rgba(0, 0, 0, 0.1)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Icon and Name */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-all duration-300">
            <Icon size={28} className="text-gray-700" />
          </div>
          <p className="text-lg font-semibold text-gray-800">{name}</p>
        </div>

        {/* Subtle Hover Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </Link>
  );
}

function Products() {
  const categories = [
    { id: 1, name: "Men Sunglasses", icon: IoGlasses },
    { id: 2, name: "Women Sunglasses", icon: IoGlassesSharp },
    { id: 3, name: "Men Eyeglasses", icon: IoGlassesOutline },
    { id: 4, name: "Women Eyeglasses", icon: BsEyeglasses },
    { id: 5, name: "Accessories", icon: WiStars }
  ];
  return (
    <div className="flex-1 relative overflow-auto z-5 text-black">
      <Header title={"Products"} />
      <main className="max-w-7xl mx-auto  py-6 px-4 lg:px-8">
        <motion.div
          // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6
          className="flex flex-wrap flex-row gap-8 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
         {categories.map(category => (
            <CardProduct
              key={category.id}
              name={category.name}
              icon={category.icon}
              path={`/${category.id}`}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
Products.layout = page => <AdminLayout>{page}</AdminLayout>;


export default Products;
