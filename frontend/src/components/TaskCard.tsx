import { FiClock, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Task } from "../types/task";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
}

const statusConfig = {
  PENDING: {
    icon: FaRegCircle,
    label: "Pendente",
    color: "text-slate-500",
    bg: "bg-slate-100",
    border: "border-slate-300",
  },
  IN_PROGRESS: {
    icon: FiClock,
    label: "Em Progresso",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-300",
  },
  DONE: {
    icon: FaRegCheckCircle,
    label: "Concluída",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
  },
} as const;

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 ${config.border}
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out`}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent
        group-hover:from-blue-50/30 group-hover:to-cyan-50/30 transition-all duration-300 pointer-events-none"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <button
            className={`flex-shrink-0 p-2 rounded-xl ${config.bg} ${config.color}
              hover:scale-110 transition-transform duration-200 cursor-pointer`}
          >
            <StatusIcon className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(task)}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200
                hover:text-slate-800 transition-all duration-200 hover:scale-110"
              title="Editar tarefa"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete?.(task.id)}
              className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100
                hover:text-red-700 transition-all duration-200 hover:scale-110"
              title="Excluir tarefa"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3
          className={`text-lg font-semibold text-slate-800 mb-2 line-clamp-2
          ${task.status === "DONE" ? "line-through opacity-60" : ""}`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p
            className={`text-sm text-slate-600 line-clamp-3 mb-4
            ${task.status === "DONE" ? "opacity-50" : ""}`}
          >
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${config.bg} ${config.color}`}
          >
            {config.label}
          </span>

          <span className="text-xs text-slate-400">
            {task.createdAt.slice(0, 10).split("-").reverse().join("/")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
