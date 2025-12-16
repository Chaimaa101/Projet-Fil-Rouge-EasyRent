import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white">


      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold leading-tight">
            Enjoy your holidays with{" "}
            <span className="text-blue-500">our wheels</span>
          </h2>
          <p className="mt-6 text-gray-300">
            Rent premium cars easily and travel comfortably anywhere you want.
          </p>
          <div className="mt-8 space-x-4">
            <button className="px-6 py-3 bg-blue-600 rounded-xl">
              Book Now
            </button>
            <button className="px-6 py-3 border border-blue-500 rounded-xl">
              Contact Us
            </button>
          </div>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1549924231-f129b911e442"
          alt="car"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg mt-10 lg:mt-0 rounded-2xl shadow-2xl"
        />
      </section>

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
