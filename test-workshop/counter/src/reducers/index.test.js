import counter from "./index";

describe("reducersssss", () => {
  describe("counter", () => {
    test("should provide the initial state", () => {
      expect(counter(undefined, {})).toBe(0);
    });

    test.skip("should handle INCREMENT action", () => {
      expect(counter(1, { type: "INCREMENT" })).toBe(2);
    });

    // TODO: add test for "DECREMENT" action

    test("should ignore unknown actions", () => {
      expect(counter(1, { type: "unknown" })).toBe(1);
    });
  });
});
