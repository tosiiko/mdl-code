# Tiny MDL Syntax

This is the tiny language surface for the first usable compiler.

## Sections

```mdl
hero:
  # Welcome
```

Output:

```html
<div class="mdl-hero">
  <h1>Welcome</h1>
</div>
```

## Smart Sections

The full mapping lives in [ELEMENT_MAPPING.md](ELEMENT_MAPPING.md).

Unknown sections become `div.mdl-name`.

Advanced browser primitives are named sections too:

```mdl
canvas@id(scene)@width(900)@height(500)@mount(drawScene):
frame@src(https://example.com)@title(Demo)@sandbox:
picture:
  source@srcset(hero.webp)@type(image/webp):
  .img@src(hero.png)@alt(Hero)
```

## Inline Elements

```mdl
.badge(beta)
.btn-primary(Choose)
.link(docs)
.input@type(email)@required
```

## Attributes

```mdl
form@id(login)@method(post):
  .input@type(email)@placeholder(Email)@required
```

Attributes are explicit. Boolean attributes use no value.

Event attributes are explicit too:

```mdl
form@submit(handleLogin):
  .btn-primary@click(handleLogin)(Sign in)

island@name(search-box)@mount(initSearch):
```

They compile to `data-mdl-on-submit`, `data-mdl-on-click`, and
`data-mdl-on-mount`. When a full document includes configured scripts, MDL
imports those modules and binds the named exported functions. `mount` handlers
run once and receive the mounted element.

## Markdown

Markdown is rendered with `pulldown-cmark`. MDL only transforms section blocks and
`.name(...)` inline elements.

## Comments

```mdl
// This becomes an HTML comment
page:
  // This comment stays inside the page section
  hero:
    ## Welcome
```

Output:

```html
<!-- This becomes an HTML comment -->
<main class="mdl-page">
  <!-- This comment stays inside the page section -->
  ...
</main>
```

Inside `script js:` blocks, `//` remains a JavaScript comment.

## JavaScript

```mdl
script js:
  console.log("ready")
```

`script js:` emits a module script. Code lines must be indented under the script
header.
