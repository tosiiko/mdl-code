# MDL Element Mapping

Every section name produces an HTML element with a matching `mdl-*` class.

```text
section-name: -> <html-element class="mdl-section-name">
```

Unknown section names are always valid and fall back to `<div>`.

## Layout Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `page:` | `<main>` | Top-level page container | Usually one per page |
| `topbar:` | `<header>` | Top header bar | Site-wide header |
| `header:` | `<header>` | Header block | Generic header |
| `footer:` | `<footer>` | Page footer |  |
| `sidebar:` | `<aside>` | Side panel or complementary content | Left or right sidebar |
| `drawer:` | `<aside>` | Slide-in side panel | JavaScript/CSS handles open state |
| `aside:` | `<aside>` | Complementary content block | Same semantic element as `sidebar:` |
| `main:` | `<main>` | Main content area | Use carefully if `page:` already maps to `<main>` |
| `panel:` | `<div>` | Generic layout panel | CSS handles layout |
| `row:` | `<div>` | Horizontal row | CSS handles flex/grid |
| `col:` | `<div>` | Column inside row | CSS handles width |
| `grid:` | `<div>` | Grid container | CSS handles columns |
| `stack:` | `<div>` | Vertical stack of items | CSS handles gap/direction |
| `split:` | `<div>` | Two-column split layout | CSS handles ratio |

## Content Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `nav:` | `<nav>` | Navigation links | Semantic navigation |
| `section:` | `<section>` | Generic content section | Semantic section |
| `article:` | `<article>` | Self-contained article or post | Blog posts, news items |
| `hero:` | `<div>` | Large intro/banner block | CSS handles height/background |
| `banner:` | `<div>` | Announcement or promo banner |  |
| `card:` | `<div>` | Content card | CSS handles border/shadow |
| `list:` | `<ul>` | Styled list container | Use for custom-styled lists |
| `item:` | `<li>` | List item | Usually inside `list:` or `nav:` |
| `steps:` | `<ol>` | Ordered steps | CSS handles step numbers |
| `step:` | `<li>` | Single step | Usually inside `steps:` |
| `summary:` | `<summary>` | Summary inside details | Pair with `details:` |
| `details:` | `<details>` | Collapsible content block | Pair with `summary:` |
| `quote:` | `<blockquote>` | Extended blockquote |  |
| `progress:` | `<progress>` | Task or loading progress | Use `@value(...)` and `@max(...)` |
| `meter:` | `<meter>` | Scalar measurement | Use `@value(...)`, `@min(...)`, and `@max(...)` |
| `note:` | `<div>` | Callout or note block | CSS handles color/border |
| `tip:` | `<div>` | Tip or hint block |  |
| `warning:` | `<div>` | Warning message block |  |

## Form Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `form:` | `<form>` | Form container | `method` and `action` via attributes |
| `field:` | `<div>` | Form field wrapper | CSS handles label/input layout |
| `fieldset:` | `<fieldset>` | Grouped set of fields |  |
| `legend:` | `<legend>` | Label for a fieldset |  |
| `label:` | `<label>` | Input label | Use `@for(value)` when needed |
| `actions:` | `<div>` | Button/action group | CSS handles alignment |
| `select:` | `<select>` | Dropdown select element |  |
| `option:` | `<option>` | Option inside select |  |
| `datalist:` | `<datalist>` | Native input suggestions | Pair with inputs using `@list(id)` |
| `optgroup:` | `<optgroup>` | Grouped options | Usually inside `select:` or `datalist:` |
| `textarea:` | `<textarea>` | Multi-line text input |  |

## Media Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `figure:` | `<figure>` | Image or media with caption |  |
| `caption:` | `<figcaption>` | Caption inside figure |  |
| `picture:` | `<picture>` | Responsive image wrapper | Use nested `source:` plus `.img(...)` or `vector:` |
| `source:` | `<source>` | Media or picture source | Void element; no children |
| `track:` | `<track>` | Timed text track for media | Void element; no children |
| `video:` | `<video>` | Video container | `src` via attributes or child elements |
| `audio:` | `<audio>` | Audio container | `src` via attributes or child elements |
| `canvas:` | `<canvas>` | Drawing, WebGL/WebGPU, charts, or custom surfaces | Often paired with `@mount(handler)` |
| `frame:` | `<iframe>` | Embedded browsing context | Prefer explicit `@title`, `@sandbox`, and `@loading(lazy)` |
| `embed:` | `<embed>` | Native embed surface for PDFs/plugins | Void element; no children |
| `vector:` | `<img>` | External SVG/vector image asset | Void element with `mdl-vector` class |
| `gallery:` | `<div>` | Image gallery grid | CSS handles grid |

## Semantic Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `dialog:` | `<dialog>` | Dialog or popup | Opened via JavaScript |
| `modal:` | `<dialog>` | Modal dialog | Same semantic element as `dialog:` |
| `table:` | `<table>` | Table container | Prefer Markdown tables for simple data |
| `thead:` | `<thead>` | Table header group |  |
| `tbody:` | `<tbody>` | Table body group |  |
| `tr:` | `<tr>` | Table row |  |
| `td:` | `<td>` | Table cell |  |
| `th:` | `<th>` | Table header cell |  |
| `address:` | `<address>` | Contact or address block |  |
| `time:` | `<time>` | Date or time element | Use `@datetime(value)` when needed |
| `template:` | `<template>` | Inert DOM template | JavaScript can clone its content |
| `slot:` | `<slot>` | Web component slot target | Usually inside templates or custom elements |

## Interactive Sections

| MDL section | HTML element | Description | Notes |
|-------------|--------------|-------------|-------|
| `tabs:` | `<div>` | Tab container | JavaScript handles switching |
| `tab:` | `<div>` | Single tab panel |  |
| `tablist:` | `<div>` | Row of tab buttons | Use ARIA attributes when needed |
| `toast:` | `<div>` | Temporary status message | CSS/JS handles visibility |
| `accordion:` | `<div>` | Accordion container | JavaScript handles open/close |
| `tooltip:` | `<div>` | Tooltip wrapper | CSS/JS handles show/hide |
| `dropdown:` | `<div>` | Dropdown menu container |  |
| `menu:` | `<menu>` | Action menu | Semantic menu element |
| `component:` | `<div>` | Registered custom component host | Use `@name(...)` and optional `@mount(handler)` |
| `widget:` | `<div>` | Third-party widget adapter host | Use `@provider(...)` and adapter-specific attrs |
| `island:` | `<div>` | Hydrated JavaScript island host | Use `@name(...)` and `@mount(handler)` |
