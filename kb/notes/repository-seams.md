---
title: Repository seams
type: concept
tags:
  - architecture
  - dependencies
  - repositories
repository_scopes:
  - AGENTS.md
  - kb
  - WRITING.md
  - STYLE.md
  - package.json
  - src
---

# Repository seams

Types publishes a runtime-free TypeScript foundation. Its stable seam is the curated declaration-only utility surface, the optional strict ambient reset entrypoint, and clean-consumer compatibility under Bundler and NodeNext resolution.

Consumers pin a reviewed immutable release or full commit and validate upgrades on their own schedule. Do not replace that boundary with sibling paths, Git submodules, or coordinated `main` workflows. Keep the package product-neutral and headless. UI primitives, presentation layers, product policy, runtime validation, and Direct compositions belong to their respective owners.

Add a shared type only after two concrete consumers need the same stable invariant. A declaration does not validate a foreign runtime value, so consumers still parse `unknown` at owned boundaries. Freeze public interfaces before parallel work and give manifests, locks, generated artifacts, and release convergence surfaces one owner.

## Related

The normative rules remain in the root `AGENTS.md`. [[documentation-ownership|Documentation ownership]] explains how those rules relate to executable contracts and this pull-based context.
