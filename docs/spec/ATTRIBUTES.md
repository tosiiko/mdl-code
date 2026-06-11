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
- Raw browser event attributes such as `@onclick(...)` are not emitted. Use
  explicit MDL event aliases such as `@click(...)`, `@submit(...)`, and
  `@keydown(...)`.
- Inline `@style(...)` and iframe `@srcdoc(...)` are not emitted. Use CSS files
  or the explicit `raw-html:` escape hatch for trusted markup.
- URL attributes such as `@href(...)`, `@src(...)`, `@action(...)`, and
  `@srcset(...)` emit only safe URL shapes. Protocol-relative URLs,
  backslash-prefixed URLs, control characters, and encoded traversal such as
  `%2e%2e` are not emitted.
- Link-style URL attributes such as `@href(...)` and `@cite(...)` allow
  relative URLs, root URLs, anchors, query-only URLs, `http`, `https`,
  `mailto`, and `tel`.
- Resource URL attributes such as `@src(...)`, `@action(...)`,
  `@formaction(...)`, `@poster(...)`, `@data(...)`, `@manifest(...)`, and
  `@srcset(...)` allow relative URLs, root URLs, anchors, query-only URLs,
  `http`, and `https`.
- Behavior attributes such as `@api(...)`, `@result(...)`, and `@swap(...)`
  are reserved by MDL and translated by the configured behavior adapter instead
  of being emitted as raw attributes.
- Raw htmx attributes such as `@hx-post(...)` are not emitted. Use the MDL
  behavior attributes so adapters can validate and translate the intent.

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

## Event Handler Attributes

Event handler attributes are resolved from configured JavaScript or TypeScript
modules in full-document output. Raw `@on*` browser attributes are still
blocked; these explicit aliases compile to `data-mdl-on-*` markers and call
exported functions by name.

```mdl
.input@keydown(handleKey)@focus(showHelp)
.btn-primary@click(save)(Save)
dialog@close(handleClose):
```

Supported browser event aliases:

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

These handlers receive the browser event. `@mount(handler)` is separate: it runs
once after configured modules are imported and receives the mounted element.

## Behavior Attributes

Behavior attributes describe app intent in MDL source. The configured adapter
decides what HTML attributes are emitted.

```mdl
form@api(post /api/login)@result(loginResult)@swap(replace)@trigger(submit)@loading(spinner)@confirm(Continue?)@include(csrfToken)@select(loginResult)@push(false)@history(false)@boost(false):
  status@id(loginResult):
    Waiting.
```

| MDL | Meaning |
|-----|---------|
| `@api(post /api/login)` | Submit or request a same-origin API path with an HTTP method. |
| `@result(loginResult)` | Use `#loginResult` as the update target. |
| `@swap(replace)` | Replace the target with the response fragment. |
| `@trigger(submit)` | Trigger the request from a known event name. |
| `@loading(spinner)` | Use `#spinner` as a request loading/indicator target. |
| `@confirm(Continue?)` | Ask for plain-text confirmation before the request. |
| `@include(csrfToken)` | Include one explicit extra id target in the request. |
| `@select(loginResult)` | Select one simple fragment from the response. |
| `@select-oob(toast)` | Select one simple out-of-band response fragment. |
| `@swap-oob(true)` | Mark response content for safe out-of-band swapping. |
| `@push(false)` | Control whether the adapter may push a URL into browser history. |
| `@replace(false)` | Control whether the adapter may replace the current browser URL. |
| `@history(false)` | Control adapter history/cache behavior. |
| `@history-elt(true)` | Mark one element as the adapter history snapshot element. |
| `@boost(false)` | Control adapter navigation boosting. |
| `@disabled(submitButton)` | Disable one explicit id target while a request is active. |
| `@disinherit(target swap)` | Stop inheriting specific adapter attributes. |
| `@encoding(multipart)` | Use a known request encoding such as multipart form data. |
| `@inherit(trigger)` | Re-enable inheritance for specific adapter attributes. |
| `@params(email csrfToken)` | Send only explicit parameter names, or `none`. |
| `@preserve(true)` | Preserve the current element across swaps when it has a safe `@id(...)`. |
| `@prompt(Security code?)` | Ask for plain-text prompt input before the request. |
| `@request(timeout=5000)` | Set a bounded request timeout. |
| `@sync(this:queue-last)` | Coordinate concurrent requests for one explicit target. |
| `@validate(true)` | Request client-side validation before sending. |

Supported API methods are `get`, `post`, `put`, `patch`, and `delete`.
External API URLs are not emitted from `@api(...)`; route API calls through the
same-origin proxy boundary instead.

Supported swap values are `inner`, `replace`, `append`, `prepend`, `before`,
`after`, and `none`.

Trust-sensitive behavior attributes are deliberately narrow:

- `@trigger(...)` accepts only known event names such as `submit`, `click`,
  `change`, `input`, `load`, `revealed`, `intersect`, `keyup`, `keydown`,
  `focus`, `blur`, `mouseenter`, and `mouseleave`. Trigger filters and
  JavaScript-like expressions are not emitted.
- `@loading(...)` accepts only `this`, `id`, or `#id` for behavior adapters.
  Native HTML values such as `@loading(lazy)` and `@loading(eager)` still emit
  as normal `loading` attributes.
- `@confirm(...)` accepts non-empty plain text up to 200 characters. Control
  characters are not emitted.
- `@include(...)` accepts only `this`, `id`, or `#id`. Broad selectors such as
  `.class`, `form`, `body`, `html`, `*`, comma selectors, and whitespace
  selectors are not emitted.
- `@select(...)` accepts one simple id or class selector such as `result`,
  `#result`, or `.result-fragment`. Broad selectors, comma selectors,
  whitespace selectors, and reserved names such as `body` are not emitted.
- `@select-oob(...)` follows the same narrow selector rules as `@select(...)`.
- `@swap-oob(...)` accepts only `true` or the known swap values. Selector
  suffixes are not emitted.
- `@push(...)` accepts only `true`, `false`, or a safe root-local path such as
  `/dashboard`.
- `@replace(...)` accepts only `true`, `false`, or a safe root-local path.
- `@history(...)` accepts only `true` or `false`.
- `@history-elt(...)`, `@preserve(...)`, and `@validate(...)` accept only
  `true` or `false`. `@preserve(true)` also requires a safe `@id(...)` on the
  same element.
- `@boost(true)` is emitted only for safe local links and forms whose method is
  `get` or `post`; `@boost(false)` can be used to explicitly disable boosting.
- `@disabled(...)` accepts only `this`, `id`, or `#id`. Plain `@disabled`
  remains a normal HTML boolean attribute.
- `@params(...)` accepts `none` or explicit parameter names only. Wildcard
  `*` and `not ...` forms are not emitted, so forms do not accidentally include
  extra fields.
- `@encoding(...)` accepts only `multipart`, `multipart/form-data`, `form`,
  `urlencoded`, or `application/x-www-form-urlencoded`.
- `@inherit(...)` accepts only known adapter attribute names such as `target`,
  `swap`, `trigger`, or `hx-target`.
- `@disinherit(...)` accepts known adapter attribute names and also allows `*`
  to disable inherited adapter behavior broadly.
- `@prompt(...)` accepts non-empty plain text up to 200 characters.
- `@request(...)` currently accepts only `timeout=milliseconds`, from `1` to
  `60000`.
- `@sync(...)` accepts `this` or one explicit id target plus one known strategy:
  `drop`, `abort`, `replace`, `queue`, `queue-first`, `queue-last`, or
  `queue-all`.

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
