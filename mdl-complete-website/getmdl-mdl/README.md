# getmdl.site

This is the public documentation site for MDL. The pages are authored in MDL,
styled with plain CSS, and built to static HTML.

## Source Map

```text
site/
  mdl.json          project config
  pages/            documentation pages
  css/site.css      site design
  scripts/site.js   copy buttons and small interactions
  assets/           logo and static media
  CNAME             custom domain for GitHub Pages
```

## Local Preview

From the repository root:

```bash
cargo build -p mdl-cli
cd site
../target/debug/mdl serve
```

Open `http://127.0.0.1:3999`.

## Validate

Run checks before publishing:

```bash
cd site
../target/debug/mdl check
../target/debug/mdl format --check
```

## Build

```bash
cargo build -p mdl-cli --release
cd site
../target/release/mdl build
```

Static output is written to `site/dist`.

## Publish

The repository workflow at `.github/workflows/deploy-site.yml` builds the CLI,
runs the site build, uploads `site/dist`, and deploys with GitHub Pages.

GitHub Pages should use the GitHub Actions source. The `CNAME` file is copied
into `site/dist` during build and points the deployment to:

```text
getmdl.site
```
