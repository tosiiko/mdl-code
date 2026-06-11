export function pluralize(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
}
export function formatPercent(value) {
    return `${value}%`;
}
export function compactText(value, fallback) {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
}
