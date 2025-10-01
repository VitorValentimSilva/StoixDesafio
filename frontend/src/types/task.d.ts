export type FilterType = "all" | "pending" | "in_progress" | "completed";
export type SortType = "newest" | "oldest" | "alphabetical";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt?: string | null;
}

export const FILTER_BACKEND_MAP: Record<FilterType, string> = {
  all: "",
  pending: "pending",
  in_progress: "in_progress",
  completed: "done",
};

export const SORT_BACKEND_MAP: Record<SortType, string> = {
  newest: "recent",
  oldest: "oldest",
  alphabetical: "az",
};
