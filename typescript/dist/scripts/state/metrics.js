export function summarizeTasks(tasks) {
    const done = tasks.filter((task)=>task.status === "done").length;
    const total = tasks.length;
    return {
        total,
        open: total - done,
        done,
        donePercent: total === 0 ? 0 : Math.round(done / total * 100)
    };
}
