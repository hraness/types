# Types

Types is a small, runtime-free TypeScript utility foundation. It re-exports `type-fest`, adds a readonly `NonEmptyArray`, and provides an opt-in strict ambient reset.

## Install from GitHub

Pin the repository to an immutable version tag:

```json
{
  "dependencies": {
    "@hraness/types": "github:hraness/types#v0.1.1"
  }
}
```

Then install with Bun:

```sh
bun install
```

## Use utility types

```ts
import type { JsonValue, NonEmptyArray } from "@hraness/types";

const names = ["Ada"] as const satisfies NonEmptyArray<string>;
const payload = { names } satisfies JsonValue;
```

## Enable the strict reset

Add a declaration file to the consuming project:

```ts
import "@hraness/types/reset";
```

The package has no runtime entrypoint. TypeScript consumes its declarations under Bundler and NodeNext resolution.

## Development and contributions

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

Report suspected vulnerabilities privately as described in [SECURITY.md](./SECURITY.md).

## License

MIT
