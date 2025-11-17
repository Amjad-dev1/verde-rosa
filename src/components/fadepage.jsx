import { motion } from "framer-motion";

export default function FadePage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
