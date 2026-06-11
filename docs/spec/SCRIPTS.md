# Scripts

MDL supports behavior in two tiny forms: inline `script js:` blocks and
configured external module scripts. Configured modules may be JavaScript files or
optional TypeScript source files.

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

Inline TypeScript blocks such as `script ts:` are not supported yet. Use
`script js:` for inline code, or configure an external `.ts` module script.

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
Only local paths, root paths, and `http`/`https` URLs are emitted for configured
head scripts. Protocol-relative URLs, non-script schemes, backslash-prefixed
URLs, control characters, and encoded traversal are ignored by the document
renderer.

## External Modules

Module scripts are configured in `mdl.json`:

```json
{
  "scripts": [
    "scripts/auth.js",
    "scripts/builder.ts"
  ]
}
```

Or from the CLI:

```sh
mdl build login.mdl --script scripts/auth.js
mdl serve login.mdl --script scripts/auth.js
```

For project builds, local `.js` module scripts are copied into the output
directory just like stylesheets. Local `.ts` module scripts are compiled by MDL
tooling into browser-ready `.js` module files:

```text
scripts/builder.ts -> scripts/builder.js
```

Generated HTML imports the compiled JavaScript URL:

```html
<script type="module">
import * as mdlModule0 from "./scripts/builder.js";
</script>
```

`mdl serve` follows the same browser-facing URL rule. A configured
`scripts/builder.ts` source is imported by the page as `./scripts/builder.js`,
and the dev server serves that JavaScript by compiling the local TypeScript
source on request.

Configured `.ts` entries may import other local `.ts` files. MDL follows the
static relative import/export graph, preserves the folder tree, and emits
matching `.js` files:

```text
scripts/app.ts
scripts/state/counter.ts
scripts/dom/status.ts

dist/scripts/app.js
dist/scripts/state/counter.js
dist/scripts/dom/status.js
```

Local TypeScript imports may use `.ts`, no extension, or the browser-facing
`.js` extension. In emitted JavaScript, local TypeScript dependencies are
imported with `.js` URLs. Bare package imports and external URLs are left alone;
MDL does not bundle npm packages.

This TypeScript support is optional behavior support. MDL does not scaffold a
`package.json`, `node_modules`, `tsconfig.json`, or TypeScript install just
because a project uses a configured `.ts` module. Built sites contain the
compiled `.js` output and do not need TypeScript at deployment time.

Configured module scripts follow the same URL policy as `head_scripts`. Relative
module paths are imported with a leading `./`, and event handlers are resolved
only from the successfully imported modules.

## Event Bindings

Event attributes compile to data attributes:

```mdl
form@submit(handleLogin):
  .btn-primary@click(handleLogin)(Sign in)
  .input@keydown(handleShortcut)@focus(showHelp)

canvas@id(scene)@mount(drawScene):
```

Output:

```html
<form class="mdl-form" data-mdl-on-submit="handleLogin">
  <button class="mdl-btn-primary" data-mdl-on-click="handleLogin">Sign in</button>
  <input class="mdl-input" data-mdl-on-keydown="handleShortcut" data-mdl-on-focus="showHelp">
</form>
<canvas class="mdl-canvas" id="scene" data-mdl-on-mount="drawScene"></canvas>
```

In full-document output, MDL imports configured module scripts and binds exported
functions by name. Browser globals are not searched for handlers.

Supported event handler aliases are:

```text
@click              @dblclick           @auxclick          @contextmenu
@command
@submit             @reset              @formdata          @beforeinput
@input              @change             @invalid           @search
@select
@compositionstart   @compositionupdate  @compositionend
@focus              @blur               @focusin           @focusout
@keydown            @keypress           @keyup
@mousedown          @mouseup            @mousemove         @mouseover
@mouseout           @mouseenter         @mouseleave
@pointerdown        @pointerup          @pointermove       @pointerover
@pointerout         @pointerenter       @pointerleave      @pointercancel
@pointerrawupdate   @gotpointercapture  @lostpointercapture
@touchstart         @touchmove          @touchend          @touchcancel
@wheel              @scroll             @scrollend
@load               @error              @abort             @resize
@canplay            @canplaythrough     @play              @playing
@pause              @ended              @durationchange    @emptied
@loadeddata         @loadedmetadata     @loadstart         @progress
@ratechange         @seeked             @seeking           @stalled
@suspend            @timeupdate         @volumechange      @waiting
@dragstart          @drag               @dragenter         @dragover
@dragleave          @drop               @dragend
@copy               @cut                @paste
@cuechange          @slotchange
@toggle             @beforetoggle       @beforematch       @close
@cancel             @contextlost        @contextrestored
@securitypolicyviolation
@fullscreenchange   @fullscreenerror
@animationstart     @animationiteration @animationend      @animationcancel
@transitionrun      @transitionstart    @transitioncancel  @transitionend
```

Those handlers receive the browser event.

`mount` is an initialization binding rather than a DOM event. It runs once after
configured modules are imported and receives the mounted element:

```js
export function drawScene(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
```
