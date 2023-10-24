//run makefile, then show errors in the terminal

const fs = require('fs');
const path = require('path');
import * as vscode from 'vscode';
import { standardMF } from './commands/makefileStandard';

const editor = vscode.window.activeTextEditor;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('makefileextension.helloWorld',
		async ()=> {
			const result = await standardMF(editor);
		}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
