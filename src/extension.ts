import { casePreservingReplace } from "@/case-preserving-replace/casePreservingReplace";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.debug(
    'Congratulations, your extension "case-preserving-find-and-replace" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "case-preserving-find-and-replace.forCurrentFile",
    casePreservingReplace
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
