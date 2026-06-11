export function byId(id) {
    return document.getElementById(id);
}
export function setText(id, text) {
    const element = byId(id);
    if (element) {
        element.textContent = text;
    }
}
export function setPressed(id, pressed) {
    const element = byId(id);
    if (element) {
        element.setAttribute("aria-pressed", String(pressed));
    }
}
