import {
  addTask,
  clearDoneTasks,
  currentPriority,
  cyclePriority,
  replaceWithScenario,
  setFilter,
  setPriority,
  snapshot,
  toggleTask,
} from "./state/store.ts";
import type { Priority, TaskFilter } from "./state/model.ts";
import { parseTaskDraft, readDraft, resetTaskForm, setPriorityControl } from "./dom/forms.ts";
import {
  renderDashboard,
  renderDraftPreview,
  renderPriorityButton,
  renderTaskList,
} from "./dom/render.js";
import { byId } from "./dom/query.ts";
import { showToast } from "./dom/toast.ts";

function refresh(message?: string) {
  const next = snapshot();
  renderDashboard(next);
  renderTaskList(next, (taskId) => {
    const task = toggleTask(taskId);
    refresh(task ? `${task.title} is now ${task.status}.` : undefined);
  });

  const form = byId<HTMLFormElement>("taskForm");
  if (form) {
    renderDraftPreview(readDraft(form, next.priority));
  }

  if (message) {
    showToast(message, "success");
  }
}

function chooseFilter(filter: TaskFilter, label: string) {
  setFilter(filter);
  refresh(label);
}

export function mountPlanner(element: HTMLElement) {
  element.dataset.ready = "true";
  setPriorityControl(currentPriority());
  refresh("Planner mounted from compiled TypeScript.");
}

export function createTaskFromForm(event: SubmitEvent) {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement | null;
  if (!form) {
    return;
  }

  const parsed = parseTaskDraft(form, currentPriority());
  if (!parsed.ok) {
    showToast(parsed.message, "warning");
    return;
  }

  const task = addTask(parsed.draft);
  resetTaskForm(form, task.priority);
  refresh(`Added ${task.title}.`);
}

export function updateDraftPreview(event: Event) {
  const form = (event.currentTarget as HTMLElement | null)?.closest("form");
  if (form instanceof HTMLFormElement) {
    const draft = readDraft(form, currentPriority());
    setPriority(draft.priority);
    renderPriorityButton(draft.priority);
    renderDraftPreview(draft);
  }
}

export function cycleTaskPriority(event: MouseEvent) {
  event.preventDefault();

  const priority: Priority = cyclePriority();
  setPriorityControl(priority);
  renderPriorityButton(priority);

  const form = byId<HTMLFormElement>("taskForm");
  if (form) {
    renderDraftPreview(readDraft(form, priority));
  }
}

export function showAllTasks() {
  chooseFilter("all", "Showing every task.");
}

export function showOpenTasks() {
  chooseFilter("open", "Showing open work.");
}

export function showDoneTasks() {
  chooseFilter("done", "Showing completed work.");
}

export function clearCompleted(event: MouseEvent) {
  event.preventDefault();
  const count = clearDoneTasks();
  refresh(count === 0 ? "No completed tasks to clear." : `Cleared ${count} completed tasks.`);
}

export function loadPresetTasks(event: MouseEvent) {
  event.preventDefault();
  replaceWithScenario();
  setPriorityControl(currentPriority());
  refresh("Loaded a fresh TypeScript scenario.");
}
