import * as vscode from 'vscode';
import * as child_process from 'child_process';

//const bannerCommand = '/opt/homebrew/bin/figlet -l -w 240 -f univers ';
//const commentBegin = '/*';
//const commentEnd   = '*/';

export function activate(context: vscode.ExtensionContext) {
	let configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('extension');
	const bannerCommand = configuration.bannerCommand;
	const commentBegin = configuration.commentBegin;
	const commentEnd   = configuration.commentEnd;
	let disposable = vscode.commands.registerCommand('vscode-banner.bannerFunction', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const line = document.lineAt(selection.start);
			const functionName = document.getText(document.getWordRangeAtPosition(selection.start));

			child_process.exec(`${bannerCommand} ${functionName}`,(err,stdout,stderr) => {
				var commentLine = '';
				if (commentEnd === '') {
					stdout.split('\n').forEach((line) => {commentLine += `${commentBegin} ${line}\n`;});
				} else {
					commentLine = `${commentBegin}\n ${stdout}\n ${commentEnd}`;
				}
				editor.edit(editBuilder => {
						editBuilder.insert(new vscode.Position(line.lineNumber, 0), commentLine + '\n');
				});
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}


