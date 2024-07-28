import * as vscode from "vscode";

/**
 * Inspired by visual studio's case-preserving-find-and-replace:
 * https://devblogs.microsoft.com/visualstudio/keep-your-casing-with-case-preserving-find-and-replace/
 *
 * Replacing “begin” with “end” will turn <b>“Begin”</b> into <b>“End”</b> and
 * <b>“BEGIN”</b> into <b>“END”</b>. <br> Replacing “onetwothree” with
 * “fourFiveSix” will turn <b>“onetwothree”</b> into <b>“fourfivesix”</b>,
 * <b>“oneTwoThree”</b> into <b>“fourFiveSix”</b>, and <b>“OneTwoThree”</b> into
 * <b>“FourFiveSix”</b>.
 */
export const casePreservingReplace = async () => {
  vscode.window.showInformationMessage(
    "Hello World from Case-preserving Find and Replace!"
  );
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return;
  }
  const searchTerm = await vscode.window.showInputBox({
    prompt: "Enter the search term",
  });
  if (!searchTerm) {
    vscode.window.showErrorMessage("Search term cannot be empty.");
    return;
  }

  const replaceTerm = await vscode.window.showInputBox({
    prompt: "Enter the replace term",
  });
  if (!replaceTerm) {
    vscode.window.showErrorMessage("Replace term cannot be empty.");
    return;
  }

  const replaceTokens = splitByCaseFromLowerToUpper(replaceTerm);

  const document = editor.document;
  const text = document.getText();
  const newText = text.replace(new RegExp(searchTerm, "gi"), (match) =>
    getReplacement(match, replaceTokens)
  );

  await editor.edit((editBuilder) => {
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(document.lineCount, 0);
    editBuilder.replace(new vscode.Range(start, end), newText);
  });
};

/* When search term is "begin", replace term is "end":
    begin -> end, 
    Begin -> End, 
    BEGIN -> END

  When search term is "onetwothree", replace term is "fourFiveSix":
    onetwothree -> fourfivesix, 
    oneTwoThree -> fourFiveSix, 
    OneTwoThree -> FourFiveSix
 */
function getReplacement(match: string, targetTokens: string[]) {
  const sourceTokens = splitByCaseFromLowerToUpper(match);
  const [sourceCountMatched, targetCountMatched] =
    makeSourceAndTargetTokenCountMatch(sourceTokens, targetTokens);
  const res = [];
  for (let i = 0; i < sourceCountMatched.length; i++) {
    if (allLower(sourceCountMatched[i])) {
      res.push(targetCountMatched[i].toLowerCase());
    } else if (allUpper(sourceCountMatched[i])) {
      res.push(targetCountMatched[i].toUpperCase());
    } else if (firstUpper(sourceCountMatched[i])) {
      res.push(
        targetCountMatched[i].charAt(0).toUpperCase() +
          targetCountMatched[i].slice(1)
      );
    } else {
      res.push(targetCountMatched[i]);
    }
  }
  return res.join("");
}

function allLower(match: string) {
  return match === match.toLowerCase();
}

function allUpper(match: string) {
  return match === match.toUpperCase();
}

function firstUpper(match: string) {
  return match === match.charAt(0).toUpperCase() + match.slice(1);
}

enum Case {
  UPPER = "UPPER",
  lower = "lower",
}

function splitByCaseFromLowerToUpper(match: string): string[] {
  const result = [];

  const stack = [];

  let preCase = Case.UPPER;

  for (const element of match) {
    const char = element;
    const currCase = getCharCase(char);
    if (currCase === Case.UPPER && preCase === Case.lower) {
      result.push(stack.join(""));
      stack.length = 0;
      stack.push(char);
    } else {
      stack.push(char);
    }
    preCase = currCase;
  }
  result.push(stack.join(""));
  return result;
}

function getCharCase(char: string): Case {
  return isAlphabet(char) && char === char.toUpperCase()
    ? Case.UPPER
    : Case.lower;
}

function isAlphabet(char: string) {
  return /^[a-zA-Z]$/.test(char);
}

function makeSourceAndTargetTokenCountMatch(
  sourceTokens: string[],
  targetTokens: string[]
): [string[], string[]] {
  if (sourceTokens.length < targetTokens.length) {
    const countMatchedTokens = makeLongerTokensSameLength(
      sourceTokens,
      targetTokens
    );
    return [sourceTokens, countMatchedTokens];
  } else if (sourceTokens.length > targetTokens.length) {
    const countMatchedTokens = makeLongerTokensSameLength(
      targetTokens,
      sourceTokens
    );
    return [countMatchedTokens, targetTokens];
  } else {
    return [sourceTokens, targetTokens];
  }
}

function makeLongerTokensSameLength(
  shorter: string[],
  longer: string[]
): string[] {
  const result = [];

  const lastIndexOfShorter = shorter.length - 1;

  for (let i = 0; i < lastIndexOfShorter; i++) {
    result.push(longer[i]);
  }

  let remaining = "";
  for (let i = lastIndexOfShorter; i < longer.length; i++) {
    remaining += longer[i];
  }
  result.push(remaining);

  return result;
}

export const __internal = {
  makeLongerTokensSameLength,
  makeSourceAndTargetTokenCountMatch,
  splitByCaseFromLowerBecomeUpper: splitByCaseFromLowerToUpper,
  getReplacement,
};
