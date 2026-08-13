# Contributing

Issues and focused pull requests are welcome.

Open an issue before starting a broad API or compatibility change. Maintainers review pull requests for focused scope, declaration portability, type behavior, tests, and documentation.

Run the local checks before opening a pull request:

```sh
bun install
bun run check
```

Keep the public surface small and include a readable compile-time witness for every new exported type.
