import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');
import { findFiles } from '../fetching/workspaceFileNames';
import { makefileBuilder } from '../fetching/makefileContentBuilder';

const makefileName = 'Makefile';
const optionsMessage = "Makefile already exists: ";
const runCurrentMakefileButton = "Run Makefile";
const makeNewMakefileButton = "Create New Makefile";
const terminal = vscode.window.createTerminal(`Ext Terminal Make`);



export async function standardMF (editor: vscode.TextEditor | undefined): Promise <void> {
    var files = await findFiles();
    if (editor) {
        const currentFileDir = path.dirname(editor.document.fileName);
        const filePath = path.join(currentFileDir, makefileName);

        // Check if the file already exists
        //TODO: change to check for file type
        if (fs.existsSync(filePath)) {
            const selection = await vscode.window.showInformationMessage(optionsMessage, runCurrentMakefileButton, makeNewMakefileButton);
                if (selection === runCurrentMakefileButton) {
                    terminal.sendText("make clean");
                    terminal.sendText("make");
                } else {
                    //delete old Makefile
                    await fs.unlinkSync(filePath);
                    await makefileBuilder(filePath, files);
                }
            
        } else {
            // Create a new file with some initial content
            await makefileBuilder(filePath, files);
            // Open the new file in the editor
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }		
    }
}