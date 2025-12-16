import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import Avis from "../components/Avis";

export default function Home() {
  return (
    <div className="">

      <HeroSection/>
      <Avis/>

      {/* Services */}
      <section className="px-10 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Pickup Delivery", "Best Prices", "Car Selection"].map((s) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={s}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center"
            >
              <h4 className="text-xl font-semibold mb-2">{s}</h4>
              <p className="text-gray-300">High quality service guaranteed.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
