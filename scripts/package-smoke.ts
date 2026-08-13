import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function run(command: string[], cwd: string): Promise<void> {
  const process = Bun.spawn(command, { cwd, stdout: "inherit", stderr: "inherit" });
  const exitCode = await process.exited;
  if (exitCode !== 0) {
    throw new Error(`Command failed (${String(exitCode)}): ${command.join(" ")}`);
  }
}

const repository = process.cwd();
const work = await mkdtemp(join(tmpdir(), "hraness-types-package-smoke-"));

try {
  const archive = join(work, "package.tgz");
  const consumer = join(work, "consumer");
  await mkdir(consumer);
  await run([
    process.execPath,
    "pm",
    "pack",
    "--filename",
    archive,
    "--ignore-scripts",
    "--quiet",
  ], repository);
  await writeFile(join(consumer, "package.json"), JSON.stringify({ private: true, type: "module" }));
  await run([process.execPath, "add", archive, "--ignore-scripts"], consumer);
  await run([
    process.execPath,
    "add",
    "@types/node@^24.10.12",
    "typescript@^6.0.3",
    "--ignore-scripts",
  ], consumer);
  await writeFile(
    join(consumer, "index.ts"),
    [
      'import "@hraness/types/reset";',
      'import type { JsonValue, NonEmptyArray, UnknownRecord } from "@hraness/types";',
      'const values = ["first"] as const satisfies NonEmptyArray<string>;',
      'const record = { id: "item" } satisfies UnknownRecord;',
      'const json = { values } satisfies JsonValue;',
      "void [record, json];",
      "",
    ].join("\n"),
  );
  for (const resolution of ["bundler", "nodenext"] as const) {
    const nodeNext = resolution === "nodenext";
    await writeFile(
      join(consumer, `tsconfig.${resolution}.json`),
      JSON.stringify({
        compilerOptions: {
          target: "ES2023",
          lib: ["ES2023", "DOM", "DOM.Iterable"],
          types: ["node"],
          strict: true,
          noEmit: true,
          skipLibCheck: false,
          module: nodeNext ? "NodeNext" : "Preserve",
          moduleResolution: nodeNext ? "NodeNext" : "Bundler",
        },
        include: ["index.ts"],
      }, null, 2),
    );
    await run([process.execPath, "x", "tsc", "-p", `./tsconfig.${resolution}.json`], consumer);
  }
} finally {
  await rm(work, { recursive: true, force: true });
}
