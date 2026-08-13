export type * from "type-fest";

/** A readonly array whose non-empty shape is visible to TypeScript. */
export type NonEmptyArray<Value> = readonly [Value, ...Value[]];
