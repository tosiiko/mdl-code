# Tiny Compiler Phase Status

## Phase 1 — Tiny Syntax

Status: done

- Spec split into focused files under `docs/spec/`
- Section naming rules documented
- Inline element rules documented
- Attribute rules documented
- Smart section mapping documented
- 10 fixture `.mdl` files added under `tests/fixtures/`
- Expected HTML snapshots added under `tests/snapshots/`

## Phase 2 — Parse Sections

Status: done

- Indentation-aware section parser
- Nested sections
- Plain text lines inside sections
- Bad indentation errors with line and column

## Phase 3 — Markdown Rendering

Status: done

- Markdown rendering uses `pulldown-cmark`
- Tables, strikethrough, task lists, blockquotes, lists, headings, code, and links come from the Markdown parser
- Raw HTML from source Markdown is escaped

## Phase 4 — Dot Inline Syntax

Status: done for the tiny spec

- `.link(page)`
- `.href(url)`
- `.btn(...)`
- `.btn-primary(...)`
- `.btn-secondary(...)`
- `.btn-ghost(...)`
- `.btn-danger(...)`
- `.input(...)`
- `.checkbox(...)`
- `.radio(...)`
- `.img(...)`
- `.badge(...)`
- `.tag(...)`
- `.mark(...)`
- `.kbd(...)`
- `.code(...)`
- `.abbr(...)`
- `.time(...)`
- Unknown dot elements fall back to `<span class="mdl-name">`

## Phase 5 — Attributes

Status: done for the tiny spec

- `@attr(value)`
- Boolean attributes such as `@required`
- Attributes on sections
- Attributes on inline elements
- Output escaping

## Phase 6 — HTML Emitter

Status: done

- AST to HTML renderer
- Smart section tag mapping
- Automatic `mdl-*` classes
- Full HTML document output
- Fragment output

## Phase 7 — CLI Build

Status: done

- `mdl build input.mdl`
- `mdl build input.mdl -o output.html`
- `--fragment`
- `--style`
- `--title`
- Error output and exit codes
- Project defaults from `mdl.json`

## Phase 8 — Tiny Dev Server

Status: done

- `mdl serve page.mdl`
- `--port`
- `--style`
- `--title`
- Recompiles the `.mdl` source on each browser refresh
- Injects live reload during local preview
- Handles concurrent browser requests
- Returns in-browser compile errors
- Serves static files such as CSS from the `.mdl` file's directory
- Serves static files with path traversal protection and expanded content types
- Supports `mdl serve` with no arguments when `mdl.json` defines an entry

## Local Environment

Status: done

- `mdl.json` defines default entry, style, title, and port
- `bin/mdl` wraps the local Cargo CLI
- `source bin/activate` adds the local wrapper to `PATH`
- After activation, use `mdl build` and `mdl serve`

## Multi-Page Projects

Status: done

- `"pages": "pages"` enables project mode
- `"output": "dist"` controls build output
- `root = "examples/multipage"` keeps the example project inside `examples/`
- `"styles": ["css/site.css"]` supports project stylesheets
- `mdl build` compiles every `.mdl` page under the pages directory
- Nested page folders are preserved in output
- Stylesheets are copied to output
- `mdl serve` routes `/about`, `/docs`, and `/docs/intro` to matching pages
- Static files such as `/css/site.css` are served from the project root

## CSS Runtime

Status: first pass done

- `"css": { "runtime": true, "bundle": "dist/app.css" }` enables CSS runtime output
- `styles` are used as CSS source files for the generated bundle
- Project builds emit the CSS bundle and link it from generated pages
- Project serve exposes the bundle route dynamically
- Runtime CSS supports early layout/state hooks such as `gap`, `align`, `cols`, `theme`, and `tone`

## JavaScript Support

Status: first pass done

- `script js:` emits inline module scripts
- `"head_scripts": ["..."]` in `mdl.json` configures classic head scripts
- `"scripts": ["..."]` in `mdl.json` configures external module scripts
- `--head-script <file>` is supported by `mdl build` and `mdl serve`
- `--script <file>` is supported by `mdl build` and `mdl serve`
- Project builds copy local scripts into output
- Event attributes such as `@click(handler)` and `@submit(handler)` compile to `data-mdl-on-*`
- Full-document output imports configured modules and binds exported handlers

## Tooling

Status: first pass done

- `mdl check` validates one file, the configured entry, or all configured pages
- `mdl format` rewrites MDL with canonical two-space indentation
- `mdl format --check` reports unformatted files without writing
- `extensions/vscode-mdl` provides VS Code syntax highlighting, snippets, and smart indentation
- VS Code comment toggling uses MDL `//` line comments

## Comments

Status: first pass done

- `// comment` is parsed as an MDL line comment
- MDL comments emit HTML comments
- `mdl format` preserves and indents comments
- Inside `script js:`, `//` remains JavaScript source

## Rich UI Patterns

Status: first pass done

- `toast:` for temporary messages
- `modal:` maps to `<dialog class="mdl-modal">`
- `drawer:` maps to `<aside class="mdl-drawer">`
- `tabs:`, `tablist:`, and `tab:` provide a predictable section structure for tabbed UIs
- `examples/login/pages/components.mdl` exercises the patterns with CSS and JavaScript

## Tailwind-Friendly Classes

Status: first pass done

- `@class(...)` appends author classes after the generated `mdl-*` class
- Utility classes can be used on sections and dot inline elements
- MDL still keeps stable `mdl-*` classes for custom CSS and component styling
