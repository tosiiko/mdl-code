import { summarizeTasks } from "./metrics.ts";
import {
  priorities,
  type PlannerSnapshot,
  type Priority,
  type Task,
  type TaskDraft,
  type TaskFilter,
} from "./model.ts";
import { scenarioTasks, seedTasks } from "./seed.ts";
import { nextId } from "../utils/id.js";

let tasks: Task[] = seedTasks();
let activeFilter: TaskFilter = "open";
let selectedPriority: Priority = "normal";

export function snapshot(): PlannerSnapshot {
  return {
    tasks,
    visibleTasks: tasks.filter((task) => {
      if (activeFilter === "all") {
        return true;
      }
      return task.status === activeFilter;
    }),
    filter: activeFilter,
    priority: selectedPriority,
    metrics: summarizeTasks(tasks),
  };
}

export function currentPriority(): Priority {
  return selectedPriority;
}

export function addTask(draft: TaskDraft): Task {
  const task: Task = {
    id: nextId("task"),
    title: draft.title,
    notes: draft.notes,
    priority: draft.priority,
    status: "open",
    createdAt: Date.now(),
  };

  tasks = [task, ...tasks];
  activeFilter = "open";
  selectedPriority = draft.priority;
  return task;
}

export function toggleTask(taskId: string): Task | undefined {
  let changed: Task | undefined;
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    changed = {
      ...task,
      status: task.status === "done" ? "open" : "done",
    };
    return changed;
  });

  return changed;
}

export function clearDoneTasks(): number {
  const before = tasks.length;
  tasks = tasks.filter((task) => task.status !== "done");
  if (activeFilter === "done") {
    activeFilter = "all";
  }
  return before - tasks.length;
}

export function setFilter(filter: TaskFilter) {
  activeFilter = filter;
}

export function cyclePriority(): Priority {
  const index = priorities.indexOf(selectedPriority);
  selectedPriority = priorities[(index + 1) % priorities.length];
  return selectedPriority;
}

export function setPriority(priority: Priority) {
  selectedPriority = priority;
}

export function replaceWithScenario() {
  tasks = scenarioTasks();
  activeFilter = "all";
  selectedPriority = "high";
}
