import { LuClipboardList } from "react-icons/lu";

interface NoTasksProps {
  title: string;
  message: string;
}

export function NoTasks({ title, message }: NoTasksProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-6 animate-bounce-slow">
        <LuClipboardList className="w-16 h-16 text-blue-500" />
      </div>

      <h3 className="text-2xl font-bold text-slate-700 mb-2 text-center">
        {title}
      </h3>
      <p className="text-slate-500 text-center max-w-md">{message}</p>
    </div>
  );
}
