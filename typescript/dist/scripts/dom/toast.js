import { byId } from "./query.js";
export function showToast(message, tone = "info") {
    const toast = byId("plannerToast");
    if (!toast) {
        return;
    }
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.dataset.visible = "true";
    window.setTimeout(()=>{
        toast.dataset.visible = "false";
    }, 2200);
}
