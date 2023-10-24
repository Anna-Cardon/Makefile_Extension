import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');
import { findFiles } from '../fetching/workspaceFileNames';
import { makefileBuilder } from '../fetching/makefileContentBuilder';

const makefileName = 'Makefile';

export async function standardMF (editor: vscode.TextEditor | undefined): Promise <void> {
    if (editor) {
        const currentFileDir = path.dirname(editor.document.fileName);
        const filePath = path.join(currentFileDir, makefileName);

        // Check if the file already exists
        //TODO: change to check for file type
        if (fs.existsSync(filePath)) {
            vscode.window.showErrorMessage('Makefile already exists');
        } else {
            var files = await findFiles();
            // Create a new file with some initial content
            //TODO: Create function that fills in makefile
            await makefileBuilder(filePath, files);
            // Open the new file in the editor
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }		
    }
}