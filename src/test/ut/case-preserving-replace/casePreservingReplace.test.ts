import { __internal } from "@/case-preserving-replace/casePreservingReplace";

test("makeLongerTokensSameLength", () => {
  console.log(process.env.NODE_ENV);

  const shorter = ["one", "Two", "THREE"];
  const longer = ["four", "Five", "SIX", "Seven", "Eight", "Nine", "Ten"];
  const result = __internal?.makeLongerTokensSameLength(shorter, longer);
  console.log(result);
  expect(result).toEqual([["four", "Five", "SIXSevenEightNineTen"]]);
});
