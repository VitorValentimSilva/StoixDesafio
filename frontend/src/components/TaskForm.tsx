import { FiPlus, FiX } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import type { Task } from "../types/task";
import { useEffect, useState, type FormEvent } from "react";

interface TaskFormProps {
  task?: Task | null;
  onCancel: () => void;
  onSubmit: (
    title: string,
    description: string,
    status: Task["status"]
  ) => void;
}

export function TaskForm({ task, onCancel, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("PENDING");
  const [titleError, setTitleError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setStatus(task.status ?? "PENDING");
      setTitleError("");
    } else {
      setTitle("");
      setDescription("");
      setStatus("PENDING");
      setTitleError("");
    }
  }, [task]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError("O título é obrigatório");
      return;
    }

    try {
      setIsSaving(true);
      await onSubmit(title.trim(), description.trim(), status);
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      alert("Ocorreu um erro ao salvar a tarefa.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {task ? (
              <>
                <IoSaveOutline className="w-6 h-6" />
                Editar Tarefa
              </>
            ) : (
              <>
                <FiPlus className="w-6 h-6" />
                Nova Tarefa
              </>
            )}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:rotate-90 cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                titleError
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-slate-50"
              } focus:border-blue-500 focus:bg-white outline-none transition-all duration-200`}
              placeholder="Ex: Comprar material de escritório"
              autoFocus
            />
            {titleError && (
              <p className="mt-2 text-sm text-red-600 animate-fade-in">
                {titleError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50
                focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 resize-none"
              placeholder="Adicione detalhes sobre a tarefa..."
            />
          </div>

          {task && (
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50
              focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 cursor-pointer"
              >
                <option value="PENDING">Pendente</option>
                <option value="IN_PROGRESS">Em Progresso</option>
                <option value="DONE">Concluída</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200 transition-all duration-200 hover:scale-105"
              disabled={isSaving}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSaving}
            >
              {isSaving
                ? task
                  ? "Salvando..."
                  : "Criando..."
                : task
                ? "Salvar Alterações"
                : "Criar Tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
