import { summarizeTasks } from "./metrics.js";
import { priorities } from "./model.js";
import { scenarioTasks, seedTasks } from "./seed.js";
import { nextId } from "../utils/id.js";
let tasks = seedTasks();
let activeFilter = "open";
let selectedPriority = "normal";
export function snapshot() {
    return {
        tasks,
        visibleTasks: tasks.filter((task)=>{
            if (activeFilter === "all") {
                return true;
            }
            return task.status === activeFilter;
        }),
        filter: activeFilter,
        priority: selectedPriority,
        metrics: summarizeTasks(tasks)
    };
}
export function currentPriority() {
    return selectedPriority;
}
export function addTask(draft) {
    const task = {
        id: nextId("task"),
        title: draft.title,
        notes: draft.notes,
        priority: draft.priority,
        status: "open",
        createdAt: Date.now()
    };
    tasks = [
        task,
        ...tasks
    ];
    activeFilter = "open";
    selectedPriority = draft.priority;
    return task;
}
export function toggleTask(taskId) {
    let changed;
    tasks = tasks.map((task)=>{
        if (task.id !== taskId) {
            return task;
        }
        changed = {
            ...task,
            status: task.status === "done" ? "open" : "done"
        };
        return changed;
    });
    return changed;
}
export function clearDoneTasks() {
    const before = tasks.length;
    tasks = tasks.filter((task)=>task.status !== "done");
    if (activeFilter === "done") {
        activeFilter = "all";
    }
    return before - tasks.length;
}
export function setFilter(filter) {
    activeFilter = filter;
}
export function cyclePriority() {
    const index = priorities.indexOf(selectedPriority);
    selectedPriority = priorities[(index + 1) % priorities.length];
    return selectedPriority;
}
export function setPriority(priority) {
    selectedPriority = priority;
}
export function replaceWithScenario() {
    tasks = scenarioTasks();
    activeFilter = "all";
    selectedPriority = "high";
}
