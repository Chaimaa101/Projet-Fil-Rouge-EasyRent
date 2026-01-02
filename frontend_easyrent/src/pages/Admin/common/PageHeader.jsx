import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle,num }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="m-8 text-center"
    >
      <h1 className="text-3xl font-semibold text-neutral-700">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-neutral-500  mt-1">
          {subtitle}
        </p>
      )}

      <p className="text-lg font-medium text-gray-700">
                Total: <span className="">{num}</span>
              </p>
    </motion.div>
  );
}
