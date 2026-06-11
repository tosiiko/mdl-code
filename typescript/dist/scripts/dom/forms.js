import { priorities, priorityLabels } from "../state/model.js";
import { compactText } from "../utils/format.js";
export function readDraft(form, fallbackPriority) {
    const data = new FormData(form);
    const priority = readPriority(data.get("priority"), fallbackPriority);
    return {
        title: compactText(String(data.get("title") || ""), ""),
        notes: compactText(String(data.get("notes") || ""), "No notes yet."),
        priority
    };
}
export function parseTaskDraft(form, fallbackPriority) {
    const draft = readDraft(form, fallbackPriority);
    if (draft.title.length < 3) {
        return {
            ok: false,
            message: "Task needs at least three characters."
        };
    }
    return {
        ok: true,
        draft
    };
}
export function resetTaskForm(form, priority) {
    form.reset();
    setPriorityControl(priority);
}
export function setPriorityControl(priority) {
    const input = document.querySelector("#taskPriority");
    const button = document.querySelector("#priorityButton");
    if (input) {
        input.value = priority;
    }
    if (button) {
        button.textContent = `Priority: ${priorityLabels[priority]}`;
    }
}
function readPriority(value, fallback) {
    const text = String(value || fallback);
    return priorities.includes(text) ? text : fallback;
}
