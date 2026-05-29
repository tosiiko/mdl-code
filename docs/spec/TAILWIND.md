# Tailwind

MDL does not become Tailwind, and Tailwind does not become MDL. The bridge is
`@class(...)`.

```mdl
page@class(min-h-screen bg-slate-50 p-6):
  card@class(max-w-md rounded-lg bg-white p-6 shadow):
    ## Welcome
    .btn-primary@class(w-full md:w-auto)(Continue)
```

Output:

```html
<main class="mdl-page min-h-screen bg-slate-50 p-6">
  <div class="mdl-card max-w-md rounded-lg bg-white p-6 shadow">
    <h2>Welcome</h2>
    <button class="mdl-btn-primary w-full md:w-auto">Continue</button>
  </div>
</main>
```

## Rule

The compiler always writes the MDL class first, then author classes:

```text
class="mdl-card p-6 rounded-lg"
```

That keeps stable MDL hooks for custom CSS while allowing utility-first styling.

## Loading Tailwind

MDL only emits classes. A project still needs Tailwind CSS available through its
own frontend build, generated CSS file, or external stylesheet/script setup.

For quick local experiments, use a head script:

```json
{
  "head_scripts": [
    "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
  ]
}
```

Or from the CLI:

```sh
mdl serve page.mdl --head-script https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4
```

For the production path, compile Tailwind into a CSS file and reference it from
`mdl.json`. If the project uses the MDL CSS bundle, put Tailwind's generated CSS
in `styles` and let MDL emit the configured bundle:

```json
{
  "css": {
    "runtime": true,
    "bundle": "dist/app.css"
  },
  "styles": [
    "css/tailwind.css",
    "css/site.css"
  ]
}
```

That keeps production pages on static CSS while preserving the same
`@class(...)` authoring style.

See `examples/tailwind` for a tiny project that uses the browser script path.
