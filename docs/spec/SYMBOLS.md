# MDL Symbols

MDL adds three symbols on top of Markdown.

| Symbol | Name | Purpose | Output idea |
|--------|------|---------|-------------|
| `:` | colon | section / block structure | HTML block element |
| `.` | dot | inline named element | classed inline or control element |
| `@` | at | attribute | HTML attribute |

## Colon — Sections

```mdl
hero:
  # Welcome
```

Sections create block structure. The section name always becomes a predictable
class:

```text
hero:     -> class="mdl-hero"
pricing:  -> class="mdl-pricing"
card:     -> class="mdl-card"
```

Known section names can map to semantic HTML. Unknown section names are valid and
fall back to `<div>`.

## Dot — Inline Elements

```mdl
.badge(beta)
.btn-primary(Choose)
.link(docs)
```

Dot elements create small inline or control elements. Known names get special
HTML, unknown names fall back to `<span class="mdl-name">`.

## At — Attributes

```mdl
form@id(login)@method(post):
  .input@type(email)@required
```

Attributes attach directly to a section or dot element.

```text
@id(login)      -> id="login"
@required       -> required
@method(post)   -> method="post"
```

## Markdown Symbols

Markdown symbols remain Markdown:

| Markdown | Meaning |
|----------|---------|
| `#` through `######` | headings |
| `**text**` | strong text |
| `_text_` | emphasized text |
| `` `code` `` | inline code |
| fenced code blocks | code blocks |
| `- item` | unordered lists |
| `1. item` | ordered lists |
| `[text](url)` | links |
| `![alt](src)` | images |
| `>` | blockquotes |
| `\| table \|` | tables |
| `---` | horizontal rule |

