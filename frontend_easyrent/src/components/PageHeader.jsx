import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="m-8 text-center"
    >
      <h1 className="text-3xl font-semibold text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-blue-100 mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
