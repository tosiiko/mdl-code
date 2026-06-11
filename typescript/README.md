# MDL TypeScript

This example shows optional external TypeScript behavior scripts with a deeper
local module tree.

The project config points to `scripts/app.ts`. That entry imports state modules,
DOM render helpers, form parsing helpers, and utility modules from nested
folders. Some imports use `.ts` and some use browser-facing `.js` specifiers so
the example exercises MDL's TypeScript import rewriting. `mdl build` follows the
local static TypeScript import tree, compiles each runtime `.ts` source to a
matching `.js` file under `dist/scripts/`, and the generated HTML imports the
JavaScript entry URL.

There is intentionally no `package.json`, `node_modules`, or `tsconfig.json` in
this example. TypeScript is handled by MDL tooling, not by the MDL site.

Run it:

```bash
../../bin/mdl serve
```

Build it:

```bash
../../bin/mdl build
```
