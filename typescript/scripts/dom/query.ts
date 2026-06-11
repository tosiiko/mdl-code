export function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

export function setText(id: string, text: string) {
  const element = byId(id);
  if (element) {
    element.textContent = text;
  }
}

export function setPressed(id: string, pressed: boolean) {
  const element = byId<HTMLButtonElement>(id);
  if (element) {
    element.setAttribute("aria-pressed", String(pressed));
  }
}
