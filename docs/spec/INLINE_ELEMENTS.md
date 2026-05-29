# MDL Inline Elements

Dot syntax creates named inline elements.

```mdl
.name(text)
.name@attr(value)(text)
```

Known names map to useful HTML. Unknown names fall back to `<span>`.

## Link Elements

| MDL inline | HTML output | Description |
|------------|-------------|-------------|
| `.link(page)` | `<a class="mdl-link" href="/page">page</a>` | Internal page link |
| `.href(url)` | `<a class="mdl-href" href="url">url</a>` | External or explicit URL link |

## Buttons

| MDL inline | HTML output | Description |
|------------|-------------|-------------|
| `.btn(text)` | `<button class="mdl-btn">text</button>` | Default button |
| `.btn-primary(text)` | `<button class="mdl-btn-primary">text</button>` | Primary action |
| `.btn-secondary(text)` | `<button class="mdl-btn-secondary">text</button>` | Secondary action |
| `.btn-ghost(text)` | `<button class="mdl-btn-ghost">text</button>` | Low-emphasis action |
| `.btn-danger(text)` | `<button class="mdl-btn-danger">text</button>` | Destructive action |

## Form Controls

| MDL inline | HTML output | Description |
|------------|-------------|-------------|
| `.input(type)` | `<input class="mdl-input" type="type">` | Input control |
| `.checkbox(label)` | checkbox input with label | Checkbox control |
| `.radio(label)` | radio input with label | Radio control |

Prefer explicit attributes when the element needs more detail:

```mdl
.input@type(email)@placeholder(you@example.com)@required
```

## Media

| MDL inline | HTML output | Description |
|------------|-------------|-------------|
| `.img(src)` | `<img class="mdl-img" src="src">` | Image |
| `.icon(name)` | `<span class="mdl-icon">name</span>` | Icon placeholder |

## Text Helpers

| MDL inline | HTML output | Description |
|------------|-------------|-------------|
| `.badge(text)` | `<span class="mdl-badge">text</span>` | Status badge |
| `.tag(text)` | `<span class="mdl-tag">text</span>` | Tag/chip |
| `.mark(text)` | `<mark class="mdl-mark">text</mark>` | Highlighted text |
| `.kbd(key)` | `<kbd class="mdl-kbd">key</kbd>` | Keyboard key |
| `.code(text)` | `<code class="mdl-code">text</code>` | Inline code |
| `.abbr(text)` | `<abbr class="mdl-abbr">text</abbr>` | Abbreviation |
| `.time(value)` | `<time class="mdl-time">value</time>` | Time/date text |

## Unknown Inline Elements

```mdl
.anything(text)
```

Outputs:

```html
<span class="mdl-anything">text</span>
```

