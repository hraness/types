# Contributing

Issues and focused pull requests are welcome.

Open an issue before starting a broad API or compatibility change. Maintainers review pull requests for focused scope, declaration portability, type behavior, tests, and documentation.

Run the local checks before opening a pull request:

```sh
bun install
bun run check
```

Keep the public surface small and include a readable compile-time witness for every new exported type.

## npm

After the GitHub Release, the release workflow's `npm` job publishes the
tagged commit to npm as `@hraness/types` with a provenance attestation. It uses npm
trusted publishing, so GitHub Actions proves the workflow's identity to npm
and no npm token is stored anywhere. No one needs to approve a release. The
job skips a version that npm already has.

npm only accepts trusted publishing for a package that already exists, so the
job warns and skips until a maintainer does this once:

1. From a clean checkout of the newest `v*` tag, which the release workflow
   has already checked, publish the first version by hand:
   `npm publish --access public --ignore-scripts`.
2. Let this workflow publish from now on:
   `npm trust github @hraness/types --repo hraness/types --file release.yml --allow-publish --yes`
   (npm 11.16 or newer).
3. In the package settings on npmjs.com, require two-factor authentication and
   disallow tokens.
