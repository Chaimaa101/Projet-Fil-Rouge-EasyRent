import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function FavoriList() {
  return (
    <div className="px-10 py-16 text-white">
      <h2 className="text-3xl font-bold mb-8">Your Favorites</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-blue-500/20"
          >
            <img src="/car.jpg" className="rounded-lg mb-4" />
            <h3 className="font-semibold">Audi RS7</h3>
            <p className="text-blue-400">$140 / day</p>
            <button className="mt-4 flex items-center gap-2 text-red-400">
              <Heart /> Remove
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
