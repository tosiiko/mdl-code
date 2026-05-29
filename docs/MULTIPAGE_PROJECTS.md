# Multi-Page MDL Projects

MDL supports project-level build and serve through `mdl.json`.

## Config

```json
{
  "root": "examples/multipage",
  "entry": "pages/index.mdl",
  "pages": "pages",
  "output": "dist",
  "css": {
    "runtime": true,
    "bundle": "dist/app.css"
  },
  "styles": [
    "css/site.css"
  ],
  "head_scripts": [
    "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
  ],
  "scripts": [
    "scripts/site.js"
  ],
  "title": "MDL Site",
  "port": 3999
}
```

## Build

```bash
mdl build
```

Compiles every `.mdl` file under the configured `pages` folder into the
configured `output` folder while preserving nested folders.

```text
examples/multipage/pages/index.mdl       -> examples/multipage/dist/index.html
examples/multipage/pages/about.mdl       -> examples/multipage/dist/about.html
examples/multipage/pages/docs.mdl        -> examples/multipage/dist/docs.html
examples/multipage/pages/docs/intro.mdl  -> examples/multipage/dist/docs/intro.html
```

Without a CSS bundle, configured local stylesheets and scripts are copied into
`dist/`.

```text
examples/multipage/css/site.css -> examples/multipage/dist/css/site.css
examples/multipage/scripts/site.js -> examples/multipage/dist/scripts/site.js
```

With `css.bundle`, MDL writes the generated CSS output and links it from every
page.

```text
examples/multipage/dist/app.css
```

Nested pages get relative bundle links:

```html
<link rel="stylesheet" href="../app.css">
```

## Serve

```bash
mdl serve
```

Serves the configured project, recompiles each page on request, and injects a
small live-reload script for local preview.

Routes:

```text
/                                      -> examples/multipage/pages/index.mdl
/home                                  -> examples/multipage/pages/index.mdl
/about                                 -> examples/multipage/pages/about.mdl
/about.html                            -> examples/multipage/pages/about.mdl
/docs                                  -> examples/multipage/pages/docs.mdl
/docs/intro                            -> examples/multipage/pages/docs/intro.mdl
/css/site.css                          -> examples/multipage/css/site.css
```

## Single-Page Override

You can still build or serve one explicit page:

```bash
mdl build examples/pricing.mdl --style pricing.css --title "MDL Pricing"
mdl serve examples/pricing.mdl --style pricing.css --title "MDL Pricing"
```
