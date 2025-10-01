import { FiCheckSquare, FiPlus } from "react-icons/fi";

interface HeaderProps {
  title: string;
  subtitle: string;
  textButton: string;
  onAddClick?: () => void;
}

export function Header({
  title,
  subtitle,
  textButton,
  onAddClick,
}: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 mt-6 w-5/6 mx-auto gap-6">
      <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <FiCheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-slate-600 mt-1 text-sm sm:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <button
          onClick={onAddClick}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 
        text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />

          {textButton}
        </button>
      </div>
    </header>
  );
}
