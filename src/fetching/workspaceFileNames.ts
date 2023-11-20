import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');

export async function findFiles () : Promise <any> {
    //Array of only cpp files paths
    //TODO: Possibly add a limit of 10 files that the user can change in the setting and 
    //add a thing to get only the names of files
    const files = (await vscode.workspace.findFiles('**/*.cpp', '**/node_modules/**', 10));
    const fileNames = [];
    for (var i = 0; files.length > i; i++){
        var stringPath = files[i].toString();
        var name = path.win32.basename(stringPath);
        fileNames.push(name);
    }

    return fileNames;
}
