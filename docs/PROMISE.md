# MDL Promise

MDL is a tiny authoring language for people who want clean web pages without
writing raw HTML.

```text
.mdl  -> structure and content
.json -> project manifest
.css  -> layout and design
.js   -> behavior when needed
HTML  -> compiler output
```

## The Promise

Write readable `.mdl`:

```mdl
pricing:
  card:
    ## Starter
    $9/month
    .btn-primary(Choose)
```

Get boring, useful HTML:

```html
<div class="mdl-pricing">
  <div class="mdl-card">
    <h2>Starter</h2>
    <p>$9/month</p>
    <button class="mdl-btn-primary">Choose</button>
  </div>
</div>
```

Style it with normal CSS:

```css
.mdl-pricing {
  display: grid;
}

.mdl-card {
  padding: 20px;
}
```

## What MDL Owns

- Page structure
- Content hierarchy
- Predictable `.mdl-*` class names
- Semantic HTML mapping for common sections
- A small inline element vocabulary
- A small CSS runtime bundle when the project asks for one

## What MDL Does Not Own

- Layout rules
- Colors and typography
- JavaScript behavior
- Application state
- Heavy framework runtime or app lifecycle

## Design Rules

1. Every section name becomes a CSS class.
2. Unknown section names are valid.
3. Markdown stays Markdown and is handled by a real Markdown parser.
4. The compiler emits clean HTML, not a framework runtime.
5. The language should be understandable in five minutes.
