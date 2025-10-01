import { LuSparkles } from "react-icons/lu";
import { motion } from "framer-motion";

interface AllCompletedTaskProps {
  title: string;
  message: string;
}

export function AllCompletedTask({ title, message }: AllCompletedTaskProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 rounded-2xl p-6"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
        >
          <LuSparkles className="w-6 h-6 text-white" />
        </motion.div>

        <div>
          <h3 className="text-lg font-bold text-emerald-900">{title}</h3>
          <p className="text-emerald-700">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}
