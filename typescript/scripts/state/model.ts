export type Priority = "low" | "normal" | "high";
export type TaskStatus = "open" | "done";
export type TaskFilter = "all" | "open" | "done";

export interface Task {
  id: string;
  title: string;
  notes: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: number;
}

export interface TaskDraft {
  title: string;
  notes: string;
  priority: Priority;
}

export interface TaskMetrics {
  total: number;
  open: number;
  done: number;
  donePercent: number;
}

export interface PlannerSnapshot {
  tasks: Task[];
  visibleTasks: Task[];
  filter: TaskFilter;
  priority: Priority;
  metrics: TaskMetrics;
}

export const priorities: Priority[] = ["low", "normal", "high"];

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
};
