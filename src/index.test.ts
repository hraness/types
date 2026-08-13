import { expect, expectTypeOf, test } from "bun:test";

import type { JsonValue, NonEmptyArray, UnknownRecord } from "./index.js";

test("public types preserve their useful constraints", () => {
  const values = ["first", "second"] as const satisfies NonEmptyArray<string>;
  const record = { id: "item" } satisfies UnknownRecord;
  const json = { values: [1, true, null] } satisfies JsonValue;

  expect(values[0]).toBe("first");
  expect(record.id).toBe("item");
  expectTypeOf(json).toMatchTypeOf<JsonValue>();
});
