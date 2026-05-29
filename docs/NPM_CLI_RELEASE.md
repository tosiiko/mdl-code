# NPM CLI Release

The public npm package is `@tosiiko/mdl`.

Users install one package:

```bash
npm install -g @tosiiko/mdl
```

The package contains a small launcher plus prebuilt Rust binaries:

```text
packages/npm/mdl/bin/mdl.js
packages/npm/mdl/scripts/postinstall.mjs
packages/npm/mdl/LICENSE-APACHE
packages/npm/mdl/vendor/darwin-arm64/mdl
packages/npm/mdl/vendor/darwin-x64/mdl
packages/npm/mdl/vendor/linux-x64/mdl
packages/npm/mdl/vendor/linux-arm64/mdl
packages/npm/mdl/vendor/win32-x64/mdl.exe
```

The launcher selects the correct binary at runtime. The npm package does not
include the Rust compiler source.

Local installs run `mdl init --quiet` from `scripts/postinstall.mjs` so a fresh
folder gets starter project files and `bin/activate`. Set
`MDL_SKIP_INIT=1` to install the package without scaffolding.

## Local Cross-Build Tools

Local all-platform builds need Rust targets, Zig, and cargo-zigbuild:

```bash
brew install rustup
brew install zig
cargo install cargo-zigbuild --locked
rustup target add aarch64-apple-darwin
rustup target add x86_64-apple-darwin
rustup target add x86_64-unknown-linux-musl
rustup target add aarch64-unknown-linux-musl
rustup target add x86_64-pc-windows-gnu
```

Homebrew installs `rustup` as keg-only because it conflicts with Homebrew Rust.
The npm build scripts automatically add `/opt/homebrew/opt/rustup/bin` and
`~/.cargo/bin` to their tool PATH.

## Local Commands

Check local tools:

```bash
cd packages/npm/mdl
npm run check:cross-tools
```

Build all configured platform binaries:

```bash
npm run build:platforms
```

Build one platform:

```bash
npm run build:platforms -- linux-x64
```

Verify package completeness:

```bash
npm run prepack
```

`npm run prepack` intentionally fails unless every platform binary exists.
It also checks that the npm package README and Apache license file are present
and that the current-platform binary reports the same version as
`packages/npm/mdl/package.json`.

Build and stage the public package:

```bash
npm run pack:public
```

That creates `packages/npm/mdl/dist/public-package` and a
`tosiiko-mdl-<version>.tgz` tarball.

## Local Publish Script

From the repository root:

```bash
./push.sh
```

The script runs `cargo test`, builds the platform binaries, verifies the npm
package, stages the public package, then asks before publishing to npm.

If the platform binaries were already built by CI and you only want to refresh
the current platform binary locally:

```bash
MDL_SKIP_PLATFORM_BUILD=1 ./push.sh
```

Set `NPM_TOKEN` to avoid the interactive token prompt. Set `MDL_YES=1` only
when you intentionally want the script to publish without the confirmation
question.

## GitHub Release Workflow

Use the `Build MDL npm package` workflow:

1. Add `NPM_TOKEN` as a GitHub repository secret.
2. Run the workflow with `publish` set to `false`.
3. Download and inspect the generated tarball artifact.
4. Run the workflow again with `publish` set to `true`.

The workflow builds macOS binaries on macOS and uses Zig/cargo-zigbuild on
Ubuntu for Linux and Windows binaries.
