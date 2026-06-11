import { byId } from "./query.ts";

export function showToast(message: string, tone: "info" | "success" | "warning" = "info") {
  const toast = byId("plannerToast");
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.dataset.visible = "true";

  window.setTimeout(() => {
    toast.dataset.visible = "false";
  }, 2200);
}
