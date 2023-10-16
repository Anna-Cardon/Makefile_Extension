//run makefile, then show errors in the terminal

const fs = require('fs');
const path = require('path');
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('makefileextension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from MakefileExtension!');
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// Prompt the user for a file name
			// Get the directory of the currently open file
			const currentFileDir = path.dirname(editor.document.fileName);
			// Define the Makefile name
			const makefileName = 'Makefile';
			// Create the full path of the new file
			const filePath = path.join(currentFileDir, makefileName);

			// Check if the file already exists
			if (fs.existsSync(filePath)) {
				vscode.window.showErrorMessage('Makefile already exists');
			} else {
				// Create a new file with some initial content
				fs.writeFileSync(filePath, 'Hello, this is a new file!\n');

				// Open the new file in the editor
				vscode.workspace.openTextDocument(filePath).then(doc => {
					vscode.window.showTextDocument(doc);
				});
			}		
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
