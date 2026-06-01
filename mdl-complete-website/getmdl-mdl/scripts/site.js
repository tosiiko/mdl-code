function normalizeCodeBlocks() {
  for (const code of document.querySelectorAll("pre code")) {
    const lines = code.textContent.replace(/\s+$/g, "").split("\n");
    const indents = lines
      .filter((line) => line.trim())
      .slice(1)
      .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
    const indent = Math.min(...indents.filter((value) => value > 0));

    if (Number.isFinite(indent) && indent > 0) {
      code.textContent = lines
        .map((line, index) => (index === 0 ? line : line.slice(indent)))
        .join("\n");
    }
  }
}

normalizeCodeBlocks();

export function copyInstallCommand(event) {
  const button = event.currentTarget;
  navigator.clipboard?.writeText(
    "mkdir my-mdl-site\ncd my-mdl-site\nnpm install @tosiiko/mdl\nnpm exec -- mdl init\nsource bin/activate\nmdl serve"
  );
  button.textContent = "Copied";
  setTimeout(() => {
    button.textContent = "Copy install";
  }, 1400);
}
