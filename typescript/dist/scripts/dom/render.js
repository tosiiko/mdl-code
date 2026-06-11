import { priorityLabels } from "../state/model.js";
import { formatPercent, pluralize } from "../utils/format.js";
import { byId, setPressed, setText } from "./query.js";
export function renderDashboard(snapshot) {
    setText("totalCount", String(snapshot.metrics.total));
    setText("openCount", String(snapshot.metrics.open));
    setText("donePercent", formatPercent(snapshot.metrics.donePercent));
    setText("boardStatus", `${pluralize(snapshot.visibleTasks.length, "visible task")} from ${pluralize(snapshot.metrics.total, "task")}.`);
    updateFilterButtons(snapshot.filter);
    renderPriorityButton(snapshot.priority);
}
export function renderTaskList(snapshot, onToggle) {
    const list = byId("taskList");
    if (!list) {
        return;
    }
    if (snapshot.visibleTasks.length === 0) {
        list.innerHTML = `<p class="empty-state">No ${snapshot.filter} tasks right now.</p>`;
        return;
    }
    list.innerHTML = snapshot.visibleTasks.map(renderTask).join("");
    list.querySelectorAll("[data-toggle-task]").forEach((button)=>{
        button.addEventListener("click", ()=>{
            const taskId = button.dataset.toggleTask;
            if (taskId) {
                onToggle(taskId);
            }
        });
    });
}
export function renderDraftPreview(draft) {
    const preview = byId("draftPreview");
    if (!preview) {
        return;
    }
    const title = draft.title || "Untitled task";
    preview.textContent = `${priorityLabels[draft.priority]} priority: ${title}. ${draft.notes}`;
}
export function renderPriorityButton(priority) {
    const button = byId("priorityButton");
    if (button) {
        button.textContent = `Priority: ${priorityLabels[priority]}`;
    }
}
function updateFilterButtons(filter) {
    setPressed("filterAllButton", filter === "all");
    setPressed("filterOpenButton", filter === "open");
    setPressed("filterDoneButton", filter === "done");
}
function renderTask(task) {
    const done = task.status === "done";
    const action = done ? "Reopen" : "Complete";
    return `
    <article class="task-card" data-status="${task.status}" data-priority="${task.priority}">
      <div>
        <p class="task-kicker">${priorityLabels[task.priority]} priority</p>
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.notes)}</p>
      </div>
      <button class="task-toggle" type="button" data-toggle-task="${escapeAttr(task.id)}">${action}</button>
    </article>
  `;
}
function escapeHtml(value) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
}
