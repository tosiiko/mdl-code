# MDL Resolution Rules

These rules define how the compiler chooses output.

## Rule 1 — Sections Always Get Classes

```mdl
hero:
```

Outputs:

```html
<div class="mdl-hero">
```

## Rule 2 — Known Sections Use Semantic Elements

```mdl
nav:
page:
form:
```

Outputs:

```html
<nav class="mdl-nav">
<main class="mdl-page">
<form class="mdl-form">
```

## Rule 3 — Unknown Sections Fall Back To `div`

```mdl
pricing:
  card:
```

Outputs:

```html
<div class="mdl-pricing">
  <div class="mdl-card">
```

## Rule 4 — Known Dot Elements Use Real Elements

```mdl
.btn-primary(Choose)
.input(email)
.link(home)
.img(hero.png)
```

Outputs:

```html
<button class="mdl-btn-primary">Choose</button>
<input class="mdl-input" type="email">
<a class="mdl-link" href="/home">home</a>
<img class="mdl-img" src="hero.png">
```

## Rule 5 — Unknown Dot Elements Fall Back To `span`

```mdl
.status(active)
```

Outputs:

```html
<span class="mdl-status">active</span>
```

## Rule 6 — Nesting Is Preserved

```mdl
page:
  nav:
    .link(home)
```

Outputs:

```html
<main class="mdl-page">
  <nav class="mdl-nav">
    <a class="mdl-link" href="/home">home</a>
  </nav>
</main>
```

## Rule 7 — Markdown Runs Inside MDL Sections

MDL identifies section structure first. Markdown content inside each section is
then rendered by `pulldown-cmark`.

