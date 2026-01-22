import { describe, it, expect } from "vitest";
import { canonicalStringify } from "../src/canonical.js";

describe("Canonical JSON", () => {
  it("sorts object keys", () => {
    const obj = { z: 1, a: 2, m: 3 };
    const result = canonicalStringify(obj);
    expect(result).toBe('{"a":2,"m":3,"z":1}');
  });

  it("handles nested objects", () => {
    const obj = { z: { b: 1, a: 2 }, a: { y: 3, x: 4 } };
    const result = canonicalStringify(obj);
    expect(result).toBe('{"a":{"x":4,"y":3},"z":{"a":2,"b":1}}');
  });

  it("preserves array order", () => {
    const obj = { arr: [3, 1, 2] };
    const result = canonicalStringify(obj);
    expect(result).toBe('{"arr":[3,1,2]}');
  });

  it("handles arrays of objects", () => {
    const obj = { items: [{ z: 1, a: 2 }, { y: 3, x: 4 }] };
    const result = canonicalStringify(obj);
    expect(result).toBe('{"items":[{"a":2,"z":1},{"x":4,"y":3}]}');
  });

  it("handles primitive types", () => {
    expect(canonicalStringify("string")).toBe('"string"');
    expect(canonicalStringify(123)).toBe('123');
    expect(canonicalStringify(true)).toBe('true');
    expect(canonicalStringify(null)).toBe('null');
  });

  it("produces consistent output regardless of key order", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { c: 3, a: 1, b: 2 };
    expect(canonicalStringify(obj1)).toBe(canonicalStringify(obj2));
  });
});
