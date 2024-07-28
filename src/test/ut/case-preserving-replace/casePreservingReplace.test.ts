import { deepEqual } from "assert";
import { __internal } from "../../../case-preserving-replace/casePreservingReplace";

test("makeLongerTokensSameLength", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const shorter = ["one", "Two", "THREE"];
  const longer = ["four", "Five", "SIX", "Seven", "Eight", "Nine", "Ten"];
  const result = __internal.makeLongerTokensSameLength(shorter, longer);
  deepEqual(result, ["four", "Five", "SIXSevenEightNineTen"]);
});

test("makeSourceAndTargetTokenCountMatch", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const source = ["one", "Two", "THREE"];
  const target = ["four", "Five", "SIX", "Seven", "Eight", "Nine", "Ten"];
  const result = __internal.makeSourceAndTargetTokenCountMatch(source, target);
  const [countMatchedSource, countMatchedTarget] = result;
  deepEqual(countMatchedSource, source);
  deepEqual(countMatchedTarget, ["four", "Five", "SIXSevenEightNineTen"]);

  const source2 = ["four", "Five", "SIX", "Seven", "Eight", "Nine", "Ten"];
  const target2 = ["one", "Two", "THREE"];
  const result2 = __internal.makeSourceAndTargetTokenCountMatch(
    source2,
    target2
  );
  const [countMatchedSource2, countMatchedTarget2] = result2;
  deepEqual(countMatchedSource2, ["four", "Five", "SIXSevenEightNineTen"]);
  deepEqual(countMatchedTarget2, target2);
});

test("splitByCaseFromLowerBecomeUpper - standard case switch", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "oneTwoThree";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["one", "Two", "Three"]);
});

test("splitByCaseFromLowerBecomeUpper - all lowercase", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "onetwothree";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["onetwothree"]);
});

test("splitByCaseFromLowerBecomeUpper - all uppercase", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "ONETWOTHREE";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["ONETWOTHREE"]);
});

test("splitByCaseFromLowerBecomeUpper - mixed case with no switch", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "one2three";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["one2three"]);
});

test("splitByCaseFromLowerBecomeUpper - single character", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "o";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["o"]);
});

test("splitByCaseFromLowerBecomeUpper - empty string", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, [""]);
});

test("splitByCaseFromLowerBecomeUpper - case switch at beginning", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "OneTwoThree";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["One", "Two", "Three"]);
});

test("splitByCaseFromLowerBecomeUpper - multiple upper case at beginning", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "ONETwoThree";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["ONETwo", "Three"]);
});

test("splitByCaseFromLowerBecomeUpper - case switch at end", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "oneTwoThreeEnd";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["one", "Two", "Three", "End"]);
});

test("splitByCaseFromLowerBecomeUpper - multiple consecutive switches", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "oneTWoTHREE";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["one", "TWo", "THREE"]);
});

test("splitByCaseFromLowerBecomeUpper - special characters and numbers", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const str = "one2Three$Four";
  const result = __internal.splitByCaseFromLowerBecomeUpper(str);
  deepEqual(result, ["one2", "Three$", "Four"]);
});

test("getReplacement - all lowercase to all lowercase", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "onetwothree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("fourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "fourfivesix");
});

test("getReplacement - camelCase to camelCase", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "oneTwoThree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("fourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "fourFiveSix");
});

test("getReplacement - camelCase to PascalCase (keep camelCase)", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "oneTwoThree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("FourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "fourFiveSix");
});

test("getReplacement - PascalCase to PascalCase", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "OneTwoThree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("fourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "FourFiveSix");
});

test("getReplacement - UPPERcase to UPPERcase with mixed case", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "ONETwoThree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("FourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "FourFiveSix");
});

test("getReplacement - UPPERcase CamelCase to mixed", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "ONETwoTHREE";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("FourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "FourFIVESIX");
});
test("getReplacement - UPPERcase CamelCase to mixed", () => {
  if (!__internal) {
    throw new Error("__internal is not defined.");
  }
  const match = "oneTwoTHREE";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("FourFiveSix");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "fourFiveSIX");
});

test("getReplacement - basic case matching", () => {
  const match = "oneTwoThree";
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined");
  }
  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDosTres");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "unoDosTres");
});

test("getReplacement - all lowercase", () => {
  const match = "onetwothree";
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined");
  }
  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDosTres");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "unodostres");
});

test("getReplacement - all uppercase", () => {
  const match = "ONETWOTHREE";
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined");
  }

  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDosTres");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "UNODOSTRES");
});

test("getReplacement - mixed case", () => {
  const match = "One Two THREE";
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined");
  }

  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDosTres");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "UnoDosTRES");
});

test("getReplacement - empty match string", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const match = "";
  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "");
});

test("getReplacement - mismatch in token lengths: target is shorter", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const match = "oneTwoThree";
  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDos");
  const result = __internal.getReplacement(match, targetTokens);
  // Assuming the function can handle mismatched lengths gracefully
  deepEqual(result, "unoDos");
});

test("getReplacement - mismatch in token lengths: source is shorter", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const match = "oneTwoThree";
  const targetTokens =
    __internal.splitByCaseFromLowerBecomeUpper("unoDosTresCuatro");
  const result = __internal.getReplacement(match, targetTokens);
  // Assuming the function can handle mismatched lengths gracefully
  deepEqual(result, "unoDosTresCuatro");
});

test("getReplacement - numbers and special characters", () => {
  if (!__internal) {
    // not possible, just satisfies typescript
    throw new Error("__internal is not defined.");
  }
  const match = "one2Three!";
  const targetTokens = __internal.splitByCaseFromLowerBecomeUpper("unoDosTres");
  const result = __internal.getReplacement(match, targetTokens);
  deepEqual(result, "unoDosTres");
});
