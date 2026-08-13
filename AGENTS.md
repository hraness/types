# Contents

- `src/index.d.ts` – the public utility-type surface and curated `type-fest` re-export.
- `src/reset.d.ts` – the opt-in strict ambient reset entrypoint.
- `src/index.test.ts` – compile-time and runtime witnesses for the public types.
- `scripts/package-smoke.ts` – clean-consumer checks for Bundler and NodeNext resolution.
- `.github/workflows/` – read-only validation and checks-gated immutable release automation.
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `LICENSE` – public usage, policy, and terms.
- `package.json`, `tsconfig.json`, and `bun.lock` – standalone package and verification configuration.

# Guidelines

- Use Bun 1.3.14 for repository commands.
- Keep `@hraness/types` runtime-free. Public entrypoints contain declarations only.
- Re-export stable general-purpose utility types from `type-fest`; add a local type only when it expresses a broadly reusable invariant that `type-fest` does not already provide.
- Keep `@hraness/types/reset` opt-in and preserve its strict ambient behavior.
- Prove every exported type with a readable compile-time witness and keep both Bundler and NodeNext consumer checks passing.
- Treat this repository as the complete project. Files and Git prose may use only its public names, paths, commands, and examples.
- Run `bun run check` before handing off a change.
- Treat a `v*` tag as a release request. Keep the tag equal to `v<package.json version>` on `main`, use strictly increasing stable versions, and verify the checks-gated immutable GitHub Release before creating another tag.
