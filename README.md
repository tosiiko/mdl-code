# MDL

MDL is a tiny authoring language for building clean HTML without writing raw
HTML by hand.

```text
.mdl  -> structure and content
.css  -> layout and design
HTML  -> compiler output
```

Read the language promise first: [docs/PROMISE.md](docs/PROMISE.md).

## Try It

Start a project with the npm package:

```bash
mkdir my-mdl-site
cd my-mdl-site
npm install @tosiiko/mdl
npm exec -- mdl init
source bin/activate
mdl serve
```

Then open:

```text
http://127.0.0.1:3999
```

`npm exec -- mdl init` creates the starter project files:

```text
my-mdl-site/
  README.md
  .gitignore
  bin/
    activate
  apps/
    my-mdl-site/
      mdl.json
      pages/
        index.mdl
      css/
        main.css
        layout.css
        components.css
      scripts/
        app.js
      assets/
        mdl-logo-tagline-light.png
```

The generated `mdl.json` is valid plain JSON with active defaults for document
metadata, stylesheets, JavaScript modules, copied assets, and the dev-server
port. Configured module scripts can also be optional local TypeScript entries
that MDL compiles to browser-ready JavaScript. The config lives inside each app,
so one workspace can share the same install and environment while multiple apps
keep separate source folders, ports, and output directories.

You can also initialize explicitly:

```bash
npm exec -- mdl init
source bin/activate
mdl check
mdl build
```

Your first edit is usually:

```text
apps/my-mdl-site/pages/index.mdl
```

Style that page in:

```text
apps/my-mdl-site/css/components.css
```

`mdl init` initializes the current folder. `mdl new my-mdl-site` creates a new
folder and runs the same scaffold logic inside it. Add another app to the same
workspace with a different port:

```bash
mdl init --app admin --port 4001
mdl serve apps/admin
```

The npm package is designed to include prebuilt binaries for macOS, Linux, and
Windows. The release workflow verifies every platform binary before publishing.
See [docs/NPM_CLI_RELEASE.md](docs/NPM_CLI_RELEASE.md) for package release
steps.

Install globally when you want `mdl` available in every shell:

```bash
npm install -g @tosiiko/mdl
mdl new my-mdl-site
cd my-mdl-site
mdl serve
```

Activate the local MDL environment:

```bash
source bin/activate
```

Activation prefixes your prompt with `(mdl:<folder>)`, exports `MDL_ACTIVE`,
and adds the project-local command shims to `PATH`. Leave it with:

```bash
deactivate_mdl
```

Then run the default project. If the workspace has one app, MDL finds
`apps/<name>/mdl.json` automatically:

```bash
mdl serve
```

If the workspace has multiple apps, choose one explicitly:

```bash
mdl serve apps/my-mdl-site
mdl serve apps/admin
```

Open:

```text
http://127.0.0.1:3999
```

Build the configured project:

```bash
mdl build
```

With the current [mdl.json](mdl.json), the example project root is
`examples/login`, so `mdl build` compiles:

```text
examples/login/pages/login.mdl            -> examples/login/dist/login.html
examples/login/pages/signup.mdl           -> examples/login/dist/signup.html
examples/login/pages/forgot-password.mdl  -> examples/login/dist/forgot-password.html
examples/login/pages/dashboard.mdl        -> examples/login/dist/dashboard.html
examples/login/css/*.css                  -> examples/login/dist/app.css
examples/login/scripts/auth.js            -> examples/login/dist/scripts/auth.js
```

You can still run explicit commands when needed:

```bash
cargo run -p mdl-cli -- build examples/sample/pricing.mdl --style pricing.css --title "MDL Pricing"
```

That creates:

```text
examples/sample/pricing.html
```

Or preview it locally without activating:

```bash
cargo run -p mdl-cli -- serve examples/sample/pricing.mdl --style pricing.css --title "MDL Pricing"
```

Try the Tailwind bridge as its own project:

```bash
cd examples/tailwind
../../bin/mdl serve
```

Try the CSS powerhouse playground:

```bash
cd examples/css-powerhouse
../../bin/mdl serve
```

Try the htmx adapter examples:

```bash
node examples/htmx/server.mjs
target/debug/mdl serve examples/htmx
```

Open `http://127.0.0.1:4010` to see live search, todo swaps, cart updates,
profile validation, out-of-band toasts, preserved islands, and boosted safe
forms. The example config uses `behavior.adapter: "htmx"` with htmx v2 and keeps
MDL source adapter-neutral through attributes such as `@api(...)`,
`@result(...)`, `@swap(...)`, and `@trigger(...)`.

Try the optional TypeScript module example:

```bash
cd examples/typescript
../../bin/mdl serve
```

Open `http://127.0.0.1:3996` to see a local `scripts/app.ts` entry import a
deeper TypeScript module tree. `mdl build` emits matching `.js` files under
`dist/scripts/`, rewrites local TypeScript imports to browser `.js` URLs, and
keeps the project free of `package.json`, `node_modules`, and `tsconfig.json`.

## Optional TypeScript Scripts

MDL supports TypeScript as optional external behavior modules in `mdl.json`.
JavaScript remains the default path, and inline `script js:` blocks keep working
unchanged.

```json
{
  "scripts": [
    "scripts/app.ts"
  ]
}
```

During `mdl build`, local `.ts` entries are transpiled by MDL tooling into
browser-ready `.js` module files in the output directory:

```text
scripts/app.ts           -> dist/scripts/app.js
scripts/state/store.ts   -> dist/scripts/state/store.js
scripts/dom/render.ts    -> dist/scripts/dom/render.js
```

Generated documents import the JavaScript URL, for example
`./scripts/app.js`. `mdl serve` uses the same browser-facing URL and serves the
compiled JavaScript for configured TypeScript sources.

TypeScript files can import other local TypeScript files as a tree. Local
imports may use `.ts`, omit the extension, or use the browser-facing `.js`
extension; MDL rewrites local TypeScript module specifiers to emitted `.js`
URLs. Bare package imports are left alone and are not bundled.

This support does not make TypeScript a project requirement. MDL does not
scaffold `package.json`, `node_modules`, `tsconfig.json`, or an npm install just
because a site uses `.ts` behavior modules, and deployed MDL output does not
need TypeScript. Inline `script ts:` blocks are still unsupported for now; use
inline `script js:` or an external configured `.ts` module.

## Workspace

```text
crates/
  mdl-core/       parser, Markdown bridge, and HTML emitter
  mdl-dev-server/ local preview HTTP server
  mdl-cli/        command line interface

docs/
  PROMISE.md      language promise and boundaries
  spec/           symbols, mappings, inline elements, attributes
  architecture/   implementation notes

examples/         single-page and multi-page example projects
extensions/       editor extensions and plugins
tests/            fixtures and snapshots
grammar/          future editor grammar assets
tools/            repo-level smoke and QA scripts
benches/          future parser/rendering benchmarks
bin/              local command wrappers
scripts/          local environment helpers
```

## Supported So Far

- Indentation-based sections: `pricing:`, `card:`, `page:`
- Automatic CSS classes: `pricing:` -> `class="mdl-pricing"`
- Smart section tags: `page:` -> `<main>`, `nav:` -> `<nav>`, `form:` -> `<form>`
- Semantic sections: `search:`, `description-list:`, `term:`, `description:`, `rule:`, `output:`, `table-caption:`, `tfoot:`, and `noscript:`
- CommonMark rendering through `pulldown-cmark`: headings, paragraphs, lists, blockquotes, code fences, tables, strikethrough, and task lists
- Dot inline elements: `.badge(text)`, `.btn-primary(text)`, `.link(path)`, `.input@type(email)`
- Attributes: `@id(value)`, `@type(value)`, `@required`, and similar explicit attributes
- Behavior adapters: `static`, `mdl`, and `htmx` v2 output for validated
  request attributes such as `@api(...)`, `@result(...)`, `@swap(...)`, and
  `@trigger(...)`
- Comments: `// text` emits `<!-- text -->`
- Tailwind-friendly author classes through `@class(...)` plus optional `head_scripts`
- CSS runtime bundles through `"css": { "runtime": true, "bundle": "dist/app.css" }`
- JavaScript and TypeScript behavior: `script js:`, configured head/module
  scripts, optional external `.ts` module entries compiled to browser `.js`,
  and event bindings such as `@click(handleLogin)`, `@keydown(handleKey)`, and
  `@pointerdown(startDrag)`
- Document metadata through `lang`, `description`, `canonical`, `favicon`, `viewport`, `meta`, `links`, and `social` presets in `mdl.json`
- Explicit escape hatches through `element@tag(my-widget):` and trusted `raw-html:` blocks
- Mount bindings: `@mount(drawScene)` initializes `canvas:`, `island:`, `component:`, and other advanced hosts from configured modules
- Advanced browser primitives: `canvas:`, `frame:`, `picture:`, `source:`, `track:`, `embed:`, `vector:`, `progress:`, `meter:`, `datalist:`, `optgroup:`, `template:`, `slot:`, `component:`, `widget:`, and `island:`
- Rich UI sections: `toast:`, `modal:`, `drawer:`, and `tabs:`
- Local preview server with live reload: `mdl serve page.mdl`
- Multi-page projects through `pages`, `output`, and `styles` in `mdl.json`
- Project scaffolding through `mdl init` and `mdl new`
- Project checks and formatting through `mdl check`, `mdl check --json` with line/column ranges, and `mdl format`
- Route and source asset checks for configured pages, MDL/Markdown links, images, media, recursive CSS url/import/font assets, plus build output manifests and HTML-to-MDL source-map sidecars
- VS Code language support in `extensions/vscode-mdl`
- Installable VSIX output via `node scripts/package-vscode-mdl-vsix.mjs`

## Spec Files

- [docs/spec/SYMBOLS.md](docs/spec/SYMBOLS.md)
- [docs/spec/ELEMENT_MAPPING.md](docs/spec/ELEMENT_MAPPING.md)
- [docs/spec/INLINE_ELEMENTS.md](docs/spec/INLINE_ELEMENTS.md)
- [docs/spec/ATTRIBUTES.md](docs/spec/ATTRIBUTES.md)
- [docs/spec/COMMENTS.md](docs/spec/COMMENTS.md)
- [docs/spec/CONFIG_SCHEMA.md](docs/spec/CONFIG_SCHEMA.md)
- [docs/spec/DIAGNOSTICS.md](docs/spec/DIAGNOSTICS.md)
- [docs/spec/SOURCE_MAPS.md](docs/spec/SOURCE_MAPS.md)
- [docs/spec/SCRIPTS.md](docs/spec/SCRIPTS.md)
- [docs/spec/CSS_RUNTIME.md](docs/spec/CSS_RUNTIME.md)
- [docs/spec/UI_PATTERNS.md](docs/spec/UI_PATTERNS.md)
- [docs/spec/TAILWIND.md](docs/spec/TAILWIND.md)
- [docs/spec/RESOLUTION_RULES.md](docs/spec/RESOLUTION_RULES.md)
- [docs/MULTIPAGE_PROJECTS.md](docs/MULTIPAGE_PROJECTS.md)
- [docs/HTML_FEATURE_GAPS.md](docs/HTML_FEATURE_GAPS.md)

## Example

```mdl
pricing:
  card:
    ## Starter
    $9/month
    .btn-primary(Choose)
```

Compiles to:

```html
<div class="mdl-pricing">
  <div class="mdl-card">
    <h2>Starter</h2>
    <p>$9/month</p>
    <button class="mdl-btn-primary">Choose</button>
  </div>
</div>
```

## Development Commands

```bash
cargo fmt --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test
source bin/activate
mdl init demo-site
mdl check
mdl format --check
mdl build
mdl serve
```

## Website

The public docs site for `getmdl.site` lives in [site](site). It is authored in
MDL and deploys static output from `site/dist` through the GitHub Pages workflow
at [.github/workflows/deploy-site.yml](.github/workflows/deploy-site.yml).

Local preview:

```bash
cargo build -p mdl-cli
cd site
../target/debug/mdl serve
```

## NPM Release

The public package lives in [packages/npm/mdl](packages/npm/mdl). A local release build should pass:

```bash
cargo fmt --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test
cd packages/npm/mdl
npm run build:platforms
npm run prepack
npm run pack:public
```

To prepare and publish a new npm version from this repo, run:

```bash
./push.sh
```

`push.sh` runs the Rust tests, builds platform binaries, verifies package
contents, creates the public package in `packages/npm/mdl/dist/public-package`,
and asks for confirmation before `npm publish`.

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## License

MDL uses the `MIT OR Apache-2.0` license expression. The Apache License 2.0
text is included in [LICENSE-APACHE](LICENSE-APACHE), and the npm package includes its own copy.
