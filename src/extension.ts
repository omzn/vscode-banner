// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

//const bannerCommand = '/opt/homebrew/bin/figlet -l -w 240 -f univers ';
//const commentBegin = '/*';
//const commentEnd   = '*/';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('extension');
	const bannerCommand = configuration.bannerCommand;
	const commentBegin = configuration.commentBegin;
	const commentEnd   = configuration.commentEnd;
		// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"vscode-banner" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-banner.bannerFunction', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const line = document.lineAt(selection.start);
			const functionName = document.getText(document.getWordRangeAtPosition(selection.start));

			child_process.exec(`${bannerCommand} ${functionName}`,(err,stdout,stderr) => {
				const commentLine = `${commentBegin}\n ${stdout}\n ${commentEnd}`;
				editor.edit(editBuilder => {
						editBuilder.insert(new vscode.Position(line.lineNumber, 0), commentLine + '\n');
				});
			});
		}
// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from vscode-banner!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


