import { priorities, priorityLabels } from "../state/model.ts";
import type { Priority, TaskDraft } from "../state/model.ts";
import { compactText } from "../utils/format.ts";

export type DraftResult =
  | { ok: true; draft: TaskDraft }
  | { ok: false; message: string };

export function readDraft(form: HTMLFormElement, fallbackPriority: Priority): TaskDraft {
  const data = new FormData(form);
  const priority = readPriority(data.get("priority"), fallbackPriority);

  return {
    title: compactText(String(data.get("title") || ""), ""),
    notes: compactText(String(data.get("notes") || ""), "No notes yet."),
    priority,
  };
}

export function parseTaskDraft(
  form: HTMLFormElement,
  fallbackPriority: Priority,
): DraftResult {
  const draft = readDraft(form, fallbackPriority);

  if (draft.title.length < 3) {
    return { ok: false, message: "Task needs at least three characters." };
  }

  return { ok: true, draft };
}

export function resetTaskForm(form: HTMLFormElement, priority: Priority) {
  form.reset();
  setPriorityControl(priority);
}

export function setPriorityControl(priority: Priority) {
  const input = document.querySelector<HTMLInputElement>("#taskPriority");
  const button = document.querySelector<HTMLButtonElement>("#priorityButton");

  if (input) {
    input.value = priority;
  }
  if (button) {
    button.textContent = `Priority: ${priorityLabels[priority]}`;
  }
}

function readPriority(value: FormDataEntryValue | null, fallback: Priority): Priority {
  const text = String(value || fallback);
  return priorities.includes(text as Priority) ? (text as Priority) : fallback;
}
