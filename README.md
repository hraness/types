# Types

Model a constraint once, then let TypeScript carry it through every Hraness project. `@hraness/types` is a declaration-only package that combines the public `type-fest` type surface, a readonly `NonEmptyArray`, and an opt-in strict ambient reset.

It ships no JavaScript and has no runtime entrypoint.

## Install the reviewed release

Pin the repository to its immutable `v0.1.1` tag:

```json
{
  "dependencies": {
    "@hraness/types": "github:hraness/types#v0.1.1"
  }
}
```

```sh
bun install
```

## Make the useful state visible

The local `NonEmptyArray` keeps the first item in the type, so code that requires at least one value does not need a runtime assertion after the value has already been proved.

```ts
import type {
  JsonValue,
  NonEmptyArray,
  UnknownRecord,
} from "@hraness/types";

type Command = {
  argv: NonEmptyArray<string>;
  context: UnknownRecord;
};

const command = {
  argv: ["inspect", "artifact.json"],
  context: { cwd: "/work" },
} as const satisfies Command;

const receipt = {
  command: command.argv[0],
  arguments: [command.argv[1]],
} satisfies JsonValue;
```

`command.argv[0]` is `string`, not `string | undefined`. An empty tuple fails at compile time:

```ts
const empty = [] as const;

// Type 'readonly []' is not assignable to NonEmptyArray<string>.
const argv: NonEmptyArray<string> = empty;
```

## Use two declaration entrypoints

| Import | What it provides | What it changes |
| --- | --- | --- |
| `@hraness/types` | The public `type-fest` utility types plus `NonEmptyArray<Value>` | Nothing at runtime |
| `@hraness/types/reset` | The strict ambient corrections from `@total-typescript/ts-reset` | TypeScript's built-in declarations for the project that imports it |

Use the reset from one declaration file in a consuming project:

```ts
// src/reset.d.ts
import "@hraness/types/reset";
```

The reset is deliberately separate. Importing the root entrypoint does not alter global declarations.

## Know the boundary

Types describe values after TypeScript has accepted them. They do not parse a network response, validate JSON, sanitize input, or make an unchecked cast safe. Start foreign runtime data as `unknown`, validate it in the consuming project, and apply these types to the validated result.

The package stays product-neutral and runtime-free:

- both public entrypoints resolve to `.d.ts` files;
- `sideEffects` is `false`;
- the package contains no JavaScript runtime implementation;
- the release is tested as an installed archive under both Bundler and NodeNext module resolution.

## Verify the package contract

The repository checks the declarations in place and from a clean packed consumer:

```sh
bun run typecheck
bun run test:package
bun test ./src
```

The clean-consumer test installs the packed artifact, imports both entrypoints, and compiles the same public types with TypeScript 6.0.3 under Bundler and NodeNext resolution.

## Questions

### Why not import `type-fest` directly?

You can. This package gives Hraness projects one reviewed dependency boundary, adds the readonly non-empty invariant, and exposes the strict reset without making either addition a runtime dependency.

### Does `NonEmptyArray` check an array at runtime?

No. Validate unknown data first. `NonEmptyArray<Value>` preserves an invariant that code has already established.

### Does the reset affect every project in a workspace?

It affects the TypeScript program that includes the declaration file. Keep the import in the specific project that wants the stricter built-in declarations.

### Which module resolution modes are supported?

The packed public artifact is tested under Bundler and NodeNext. The repository's current compatibility witness uses TypeScript 6.0.3.

## Change the foundation carefully

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before proposing a shared type. Add a deterministic compile-time witness for every exported invariant and run the complete package check before opening a pull request.

Report suspected vulnerabilities privately as described in [SECURITY.md](./SECURITY.md).

## License

MIT
