# MDL Workspace Architecture

The repository is organized so the tiny compiler can grow into a full language
toolchain without mixing responsibilities.

```text
mdl/
  crates/
    mdl-core/       parser, mapping tables, Markdown bridge, HTML emitter
    mdl-dev-server/ local preview HTTP server
    mdl-cli/        terminal commands such as mdl build

  docs/
    PROMISE.md      the language promise and boundaries
    spec/           syntax and language specification
    architecture/   implementation and workspace notes

  examples/         small real MDL pages with matching CSS/output
  extensions/       editor extensions and plugins
  tests/
    fixtures/       input .mdl cases for integration tests
    snapshots/      expected HTML output

  grammar/          future editor grammar and syntax highlighting assets
  tools/            future dev scripts and release helpers
  benches/          future parser/rendering benchmarks
```

## Current Crates

### `mdl-core`

Owns language behavior:

- Section parsing
- Attribute parsing
- MDL inline parsing
- Section name to HTML element mapping
- CommonMark rendering via `pulldown-cmark`
- HTML output
- Compiler errors

This crate should not know about terminal arguments, files, servers, or editor
integrations.

Current source files:

| File | Responsibility |
|------|----------------|
| `crates/mdl-core/src/lib.rs` | Compiler API, parser, Markdown transform, HTML emitter |
| `crates/mdl-core/src/mapping.rs` | Section name to HTML element mapping |
| `crates/mdl-dev-server/src/lib.rs` | Local HTTP serving, routing, static files, live reload |
| `crates/mdl-cli/src/main.rs` | CLI argument parsing and file IO |

As the compiler grows, `lib.rs` should split further into `parser.rs`,
`inline.rs`, `markdown.rs`, `html.rs`, `attrs.rs`, and `error.rs`.

### `mdl-cli`

Owns command line behavior:

- Argument parsing
- Reading `.mdl` files
- Writing `.html` files
- Showing errors
- Delegating `mdl serve` to `mdl-dev-server`
- Running `mdl check` and `mdl format`
- Future `mdl check` and `mdl format` refinements

### `mdl-dev-server`

Owns local preview behavior:

- Request parsing and HTTP responses
- Single-page and project routing
- Static file safety and content types
- In-browser compile errors
- Live reload for local editing

## Extensions

### `extensions/vscode-mdl`

Owns editor support for VS Code:

- `.mdl` file registration
- TextMate syntax highlighting
- Two-space indentation defaults and on-enter indentation
- Snippets for common MDL sections and inline elements

## Future Crates

Add these only when the need is real:

- `mdl-lsp` for editor intelligence
- `mdl-wasm` for browser/runtime experiments
- `mdl-fmt` if formatting grows beyond the CLI
