# MDL Attributes

Attributes attach directly to sections or dot inline elements.

```mdl
section@attr(value):
  .inline@attr(value)(text)
  .inline@boolean
```

## Rules

- `@attr(value)` emits `attr="value"`.
- `@attr` emits a boolean attribute.
- Multiple attributes can be chained.
- Attribute order does not change meaning.
- `@class(...)` appends author classes after the generated `mdl-*` class.

## Common Attributes

| MDL | HTML |
|-----|------|
| `@id(name)` | `id="name"` |
| `@type(email)` | `type="email"` |
| `@placeholder(text)` | `placeholder="text"` |
| `@required` | `required` |
| `@disabled` | `disabled` |
| `@checked` | `checked` |
| `@readonly` | `readonly` |
| `@autofocus` | `autofocus` |
| `@method(post)` | `method="post"` |
| `@action(/path)` | `action="/path"` |
| `@href(url)` | `href="url"` |
| `@target(blank)` | `target="blank"` |
| `@src(url)` | `src="url"` |
| `@srcset(value)` | `srcset="value"` |
| `@alt(text)` | `alt="text"` |
| `@value(text)` | `value="text"` |
| `@name(text)` | `name="text"` |
| `@width(900)` | `width="900"` |
| `@height(500)` | `height="500"` |
| `@controls` | `controls` |
| `@sandbox` | `sandbox` |
| `@loading(lazy)` | `loading="lazy"` |
| `@mount(handler)` | `data-mdl-on-mount="handler"` |
| `@for(id)` | `for="id"` |
| `@datetime(value)` | `datetime="value"` |
| `@aria-label(text)` | `aria-label="text"` |
| `@data-key(value)` | `data-key="value"` |
| `@class(p-4 bg-white)` | Adds `p-4 bg-white` after the `mdl-*` class |

## Examples

```mdl
form@id(login)@method(post)@action(/login):
  field:
    label@for(email):
      Email
    .input@id(email)@type(email)@placeholder(you@example.com)@required
```

```html
<form class="mdl-form" id="login" method="post" action="/login">
  <div class="mdl-field">
    <label class="mdl-label" for="email">Email</label>
    <input class="mdl-input" id="email" type="email" placeholder="you@example.com" required>
  </div>
</form>
```

## Author Classes

MDL always keeps its generated class first:

```mdl
card@class(p-6 rounded-lg bg-white shadow):
  .btn-primary@class(w-full)(Continue)
```

```html
<div class="mdl-card p-6 rounded-lg bg-white shadow">
  <button class="mdl-btn-primary w-full">Continue</button>
</div>
```

This makes Tailwind-style utility classes possible without removing the stable
`mdl-*` hooks used by component CSS.
