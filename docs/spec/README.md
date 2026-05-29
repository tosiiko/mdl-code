# MDL Specification

The MDL spec is split into small files because each part will grow at a
different speed.

## Files

| File | Purpose |
|------|---------|
| [SYMBOLS.md](SYMBOLS.md) | The symbols MDL adds on top of Markdown |
| [ELEMENT_MAPPING.md](ELEMENT_MAPPING.md) | Section name to HTML element mapping |
| [INLINE_ELEMENTS.md](INLINE_ELEMENTS.md) | Dot inline elements such as `.btn-primary(text)` |
| [ATTRIBUTES.md](ATTRIBUTES.md) | Attribute syntax such as `@id(value)` and `@required` |
| [COMMENTS.md](COMMENTS.md) | Line comments and their HTML output |
| [SCRIPTS.md](SCRIPTS.md) | JavaScript blocks, event bindings, and mount bindings |
| [UI_PATTERNS.md](UI_PATTERNS.md) | Rich UI sections such as `toast:`, `modal:`, `drawer:`, and `tabs:` |
| [TAILWIND.md](TAILWIND.md) | Using `@class(...)` with utility-first CSS |
| [RESOLUTION_RULES.md](RESOLUTION_RULES.md) | How the compiler decides what output to produce |
| [TINY_SYNTAX.md](TINY_SYNTAX.md) | The first tiny compiler surface |

## Rule Of Ownership

- Markdown owns normal Markdown syntax.
- MDL owns `:`, `.`, `@`, and `//` outside JavaScript blocks.
- JavaScript owns code inside `script js:` blocks.
- CSS owns visual layout and styling.
- The compiler owns conversion to clean HTML.
