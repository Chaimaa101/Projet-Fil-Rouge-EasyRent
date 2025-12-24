import { motion } from "framer-motion";

function GlobalLoader() {
  return (
   <div className="flex justify-center items-center h-[100vh] bg-white/10 backdrop-blur-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
  );
}

export default GlobalLoader;
