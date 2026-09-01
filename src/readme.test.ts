import { expect, test } from "bun:test";

import type { JsonValue, NonEmptyArray, UnknownRecord } from "./index.js";

const readme = await Bun.file(new URL("../README.md", import.meta.url)).text();

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

test("README leads with the runtime-free result and immutable install", () => {
  expect(readme).toContain("It ships no JavaScript and has no runtime entrypoint.");
  expect(readme).toContain('"@hraness/types": "github:hraness/types#v0.1.1"');
  expect(readme).toContain("import type {");
});

test("README documents both declaration entrypoints and their boundary", () => {
  expect(readme).toContain("`@hraness/types/reset`");
  expect(readme).toContain('import "@hraness/types/reset";');
  expect(readme).toContain("They do not parse a network response");
  expect(readme).toContain("Bundler and NodeNext");
});

test("README's complete public example preserves the claimed types", () => {
  expect(command.argv[0]).toBe("inspect");
  expect(command.context.cwd).toBe("/work");
  expect(receipt).toEqual({ command: "inspect", arguments: ["artifact.json"] });
});
