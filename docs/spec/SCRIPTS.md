# JavaScript

MDL supports JavaScript in two tiny forms: inline `script js:` blocks and
configured scripts.

## Inline Blocks

```mdl
script js:
  const form = document.querySelector("#loginForm")
  form?.classList.add("ready")
```

Output:

```html
<script type="module">
const form = document.querySelector("#loginForm")
form?.classList.add("ready")
</script>
```

The compiler does not escape or rewrite JavaScript source inside the block. It is
author-owned code.

## Head Scripts

Some browser tools need a classic script tag in the document head. Configure
those with `head_scripts`:

```json
{
  "head_scripts": [
    "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
  ]
}
```

Or from the CLI:

```sh
mdl build login.mdl --head-script https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4
mdl serve login.mdl --head-script https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4
```

Output:

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
```

`head_scripts` are loaded as classic scripts. They are not imported into MDL's
event binding runtime.

## External Modules

Module scripts are configured in `mdl.json`:

```json
{
  "scripts": [
    "scripts/auth.js"
  ]
}
```

Or from the CLI:

```sh
mdl build login.mdl --script scripts/auth.js
mdl serve login.mdl --script scripts/auth.js
```

For project builds, local scripts are copied into the output directory just like
stylesheets.

## Event Bindings

Event attributes compile to data attributes:

```mdl
form@submit(handleLogin):
  .btn-primary@click(handleLogin)(Sign in)

canvas@id(scene)@mount(drawScene):
```

Output:

```html
<form class="mdl-form" data-mdl-on-submit="handleLogin">
  <button class="mdl-btn-primary" data-mdl-on-click="handleLogin">Sign in</button>
</form>
<canvas class="mdl-canvas" id="scene" data-mdl-on-mount="drawScene"></canvas>
```

In full-document output, MDL imports configured module scripts and binds exported
functions by name. Event handlers for `click`, `submit`, `input`, and `change`
receive the browser event.

`mount` is an initialization binding rather than a DOM event. It runs once after
configured modules are imported and receives the mounted element:

```js
export function drawScene(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
```
