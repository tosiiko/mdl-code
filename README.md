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
source bin/activate
mdl serve
```

The local install creates the starter project files when they are missing:

```text
my-mdl-site/
  mdl.json
  README.md
  .gitignore
  bin/
    activate
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

The generated `mdl.json` includes active defaults plus commented optional areas
for root folders, extra stylesheets, head scripts, JavaScript modules, and
copied assets.

You can also initialize explicitly:

```bash
npm exec -- mdl init
source bin/activate
mdl check
mdl build
```

`mdl init` initializes the current folder. `mdl new my-mdl-site` creates a new
folder and runs the same scaffold logic inside it.

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

Then run the default project from `mdl.json`:

```bash
mdl serve
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
tools/            future dev scripts
benches/          future parser/rendering benchmarks
bin/              local command wrappers
scripts/          local environment helpers
```

## Supported So Far

- Indentation-based sections: `pricing:`, `card:`, `page:`
- Automatic CSS classes: `pricing:` -> `class="mdl-pricing"`
- Smart section tags: `page:` -> `<main>`, `nav:` -> `<nav>`, `form:` -> `<form>`
- CommonMark rendering through `pulldown-cmark`: headings, paragraphs, lists, blockquotes, code fences, tables, strikethrough, and task lists
- Dot inline elements: `.badge(text)`, `.btn-primary(text)`, `.link(path)`, `.input@type(email)`
- Attributes: `@id(value)`, `@type(value)`, `@required`, and similar explicit attributes
- Comments: `// text` emits `<!-- text -->`
- Tailwind-friendly author classes through `@class(...)` plus optional `head_scripts`
- CSS runtime bundles through `"css": { "runtime": true, "bundle": "dist/app.css" }`
- JavaScript: `script js:`, configured head/module scripts, and event bindings such as `@click(handleLogin)`
- Mount bindings: `@mount(drawScene)` initializes `canvas:`, `island:`, `component:`, and other advanced hosts from configured modules
- Advanced browser primitives: `canvas:`, `frame:`, `picture:`, `source:`, `track:`, `embed:`, `vector:`, `progress:`, `meter:`, `datalist:`, `optgroup:`, `template:`, `slot:`, `component:`, `widget:`, and `island:`
- Rich UI sections: `toast:`, `modal:`, `drawer:`, and `tabs:`
- Local preview server with live reload: `mdl serve page.mdl`
- Multi-page projects through `pages`, `output`, and `styles` in `mdl.json`
- Project scaffolding through `mdl init` and `mdl new`
- Project checks and formatting through `mdl check` and `mdl format`
- VS Code language support in `extensions/vscode-mdl`
- Installable VSIX output via `node scripts/package-vscode-mdl-vsix.mjs`

## Spec Files

- [docs/spec/SYMBOLS.md](docs/spec/SYMBOLS.md)
- [docs/spec/ELEMENT_MAPPING.md](docs/spec/ELEMENT_MAPPING.md)
- [docs/spec/INLINE_ELEMENTS.md](docs/spec/INLINE_ELEMENTS.md)
- [docs/spec/ATTRIBUTES.md](docs/spec/ATTRIBUTES.md)
- [docs/spec/COMMENTS.md](docs/spec/COMMENTS.md)
- [docs/spec/SCRIPTS.md](docs/spec/SCRIPTS.md)
- [docs/spec/CSS_RUNTIME.md](docs/spec/CSS_RUNTIME.md)
- [docs/spec/UI_PATTERNS.md](docs/spec/UI_PATTERNS.md)
- [docs/spec/TAILWIND.md](docs/spec/TAILWIND.md)
- [docs/spec/RESOLUTION_RULES.md](docs/spec/RESOLUTION_RULES.md)
- [docs/MULTIPAGE_PROJECTS.md](docs/MULTIPAGE_PROJECTS.md)

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

## License

MDL uses the `MIT OR Apache-2.0` license expression. The Apache License 2.0
text is included in [LICENSE-APACHE](LICENSE-APACHE), and the npm package includes its own copy.
