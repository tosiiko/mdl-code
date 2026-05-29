# CSS Runtime

MDL can generate a CSS-only runtime bundle from `mdl.json`.

```json
{
  "css": {
    "runtime": true,
    "bundle": "dist/app.css"
  },
  "styles": [
    "css/base.css",
    "css/app.css"
  ]
}
```

`styles` are the source CSS files. `css.bundle` is the output CSS file. When
`css.runtime` is true, MDL writes its runtime layer first, then appends the
configured source CSS files.

Generated HTML links the bundle:

```html
<link rel="stylesheet" href="app.css">
```

Nested output pages get relative links:

```html
<link rel="stylesheet" href="../app.css">
```

## Runtime Hooks

The first runtime layer is CSS-only. It uses stable `mdl-*` classes and simple
attribute hooks:

```mdl
page@theme(dark):
  stack@gap(5)@align(center):
    card@tone(primary):
      ## Pro
      $29/month
```

The emitted HTML stays plain:

```html
<main class="mdl-page" theme="dark">
  <div class="mdl-stack" gap="5" align="center">
    <div class="mdl-card" tone="primary">
      ...
    </div>
  </div>
</main>
```

The CSS runtime handles layout and state with native CSS. JavaScript is not
required for these behaviors.

See `examples/css-powerhouse` for a CSS-only playground that combines `:has()`,
container queries, cascade layers, typed custom properties, and CSS functions.
