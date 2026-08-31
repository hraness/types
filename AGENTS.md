<!-- kb:context scopes/repository--cdb4ee2aea69 -->
# Contents

- `src/index.d.ts` – the public utility-type surface and curated `type-fest` re-export.
- `src/reset.d.ts` – the opt-in strict ambient reset entrypoint.
- `src/index.test.ts` – compile-time and runtime witnesses for the public types.
- `scripts/package-smoke.ts` – clean-consumer checks for Bundler and NodeNext resolution.
- `kb/` – authored repository rationale, maintained synthesis, and durable plans.
- `.agents/skills/` – portable KB and phased-execution workflows.
- `WRITING.md` and `STYLE.md` – internal and public prose contracts.
- `.github/workflows/` – read-only validation and checks-gated immutable release automation.
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `LICENSE` – public usage, policy, and terms.
- `package.json`, `tsconfig.json`, and `bun.lock` – standalone package and verification configuration.

# Guidelines

- Use Bun 1.3.14 for repository commands.
- Follow `WRITING.md` for internal prose and `STYLE.md` for public prose.
- Apply unreasonably robust programming when agent work is cheap. Prefer coherent cross-file correctness and focused deterministic evidence to a knowingly weaker design.
- Deliver changes to `main` through a current-head pull request. Keep the stable `Required` CI job green, resolve every review thread, and serialize merges. Human approval stays optional while one regular maintainer would otherwise self-review. Never force-push or bypass the gate.
- Keep `@hraness/types` runtime-free. Public entrypoints contain declarations only.
- Re-export stable general-purpose utility types from `type-fest`; add a local type only when it expresses a broadly reusable invariant that `type-fest` does not already provide.
- Keep `@hraness/types/reset` opt-in and preserve its strict ambient behavior.
- Model invalid states out of existence in public types. Parse foreign runtime values from `unknown` in consuming code rather than pretending declarations validate them.
- Prove every exported type with a readable deterministic compile-time regression witness. Use property laws for any runtime parser, generator, ordering rule, or round trip added to repository tooling.
- Pin Hraness dependencies to reviewed immutable releases or full commits. Never connect repositories with sibling paths, Git submodules, or coordinated `main` assumptions.
- Extract a shared type only after two concrete consumers need the same stable interface. Keep this package product-neutral and independently releasable; consumers upgrade on their own validation schedule.
- Keep this package headless. Do not add UI, design-system, application composition, product policy, or product-specific variants.
- Freeze public interfaces before parallel lanes begin. Give manifests, lockfiles, generated files, and other convergence surfaces one owner while lanes edit disjoint paths.
- Keep mandatory rules in the closest `AGENTS.md`, current procedures in `docs/` when needed, executable contracts in declarations and tests, and pull-based rationale and plans in `kb/`.
- Run `bun run kb:check:lane` in an independent KB lane. The integrating agent runs `bun run kb:refresh` and `bun run kb:check`.
- Treat this repository as the complete project. Files and Git prose may use only its public names, paths, commands, and examples.
- Run `bun run check` before handing off a change.
- Treat a `v*` tag as a release request. Keep the tag equal to `v<package.json version>` on `main`, use strictly increasing stable versions, and verify the checks-gated immutable GitHub Release before creating another tag.

<!-- hra-local-efficiency:start -->
- Preserve useful agent fan-out. Give each expensive focused validation command and external wait one owner; the integration owner reviews that evidence and runs the repository-required aggregate or final gate once after convergence. Reuse evidence only for the exact Git tree, command, lockfiles, toolchain, relevant environment, and validity period, and never to skip a required final integration, merge, release, deployment, or production-verification gate. On Hraness development machines, use `$hra-local-efficiency` and the installed host scheduler for heavyweight top-level commands when available.
<!-- hra-local-efficiency:end -->
