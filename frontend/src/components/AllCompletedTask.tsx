import { LuSparkles } from "react-icons/lu";

interface AllCompletedTaskProps {
  title: string;
  message: string;
}

export function AllCompletedTask({ title, message }: AllCompletedTaskProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce-slow">
          <LuSparkles className="w-6 h-6 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-emerald-900">{title}</h3>
          <p className="text-emerald-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
