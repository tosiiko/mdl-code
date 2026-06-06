# MDL htmx Examples

This example app demonstrates MDL behavior attributes compiled through the
`htmx` adapter. The MDL source stays adapter-neutral with attributes such as
`@api(...)`, `@result(...)`, `@swap(...)`, and `@trigger(...)`; the configured
adapter emits `hx-*` HTML.

## Run It

Start the demo API server:

```bash
node examples/htmx/server.mjs
```

In another terminal, serve the MDL app:

```bash
target/debug/mdl serve examples/htmx
```

Open <http://127.0.0.1:4010>.

The app proxies `/api/*` to `http://127.0.0.1:4011`. The pages load htmx from a
pinned CDN URL in `mdl.json`:

```text
https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js
```

For an offline demo, download that file into `scripts/htmx.min.js` and replace
the `head_scripts` entry with the local path.

## Pages

- `index.mdl` loads a dashboard summary with `@trigger(load)`.
- `search.mdl` performs live search with `@api(get ...)`, `@trigger(input)`,
  `@result(...)`, and `@loading(...)`.
- `todos.mdl` posts a form, swaps a list fragment, and updates an out-of-band
  toast.
- `cart.mdl` submits product cards and swaps the cart panel.
- `profile.mdl` demonstrates validation, disabled elements, confirmation,
  request timeout, parameter filtering, and sync behavior.
- `advanced.mdl` shows prompted requests, `hx-preserve`, boosted safe forms,
  and out-of-band responses.

## Build

```bash
target/debug/mdl check examples/htmx
target/debug/mdl build examples/htmx
```

The built output lands in `examples/htmx/dist`.
