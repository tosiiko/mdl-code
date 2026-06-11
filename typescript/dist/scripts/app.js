import { addTask, clearDoneTasks, currentPriority, cyclePriority, replaceWithScenario, setFilter, setPriority, snapshot, toggleTask } from "./state/store.js";
import { parseTaskDraft, readDraft, resetTaskForm, setPriorityControl } from "./dom/forms.js";
import { renderDashboard, renderDraftPreview, renderPriorityButton, renderTaskList } from "./dom/render.js";
import { byId } from "./dom/query.js";
import { showToast } from "./dom/toast.js";
function refresh(message) {
    const next = snapshot();
    renderDashboard(next);
    renderTaskList(next, (taskId)=>{
        const task = toggleTask(taskId);
        refresh(task ? `${task.title} is now ${task.status}.` : undefined);
    });
    const form = byId("taskForm");
    if (form) {
        renderDraftPreview(readDraft(form, next.priority));
    }
    if (message) {
        showToast(message, "success");
    }
}
function chooseFilter(filter, label) {
    setFilter(filter);
    refresh(label);
}
export function mountPlanner(element) {
    element.dataset.ready = "true";
    setPriorityControl(currentPriority());
    refresh("Planner mounted from compiled TypeScript.");
}
export function createTaskFromForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
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
export function updateDraftPreview(event) {
    const form = event.currentTarget?.closest("form");
    if (form instanceof HTMLFormElement) {
        const draft = readDraft(form, currentPriority());
        setPriority(draft.priority);
        renderPriorityButton(draft.priority);
        renderDraftPreview(draft);
    }
}
export function cycleTaskPriority(event) {
    event.preventDefault();
    const priority = cyclePriority();
    setPriorityControl(priority);
    renderPriorityButton(priority);
    const form = byId("taskForm");
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
export function clearCompleted(event) {
    event.preventDefault();
    const count = clearDoneTasks();
    refresh(count === 0 ? "No completed tasks to clear." : `Cleared ${count} completed tasks.`);
}
export function loadPresetTasks(event) {
    event.preventDefault();
    replaceWithScenario();
    setPriorityControl(currentPriority());
    refresh("Loaded a fresh TypeScript scenario.");
}
