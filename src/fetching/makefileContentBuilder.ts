import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');

//TODO: Think about the vscode.uri instead of a string
export async function makefileBuilder (filePath: string, files : any): Promise <any>{

    //TODO: Get the function name from command input
    const functionName = await vscode.window.showInputBox({prompt: "Input the function name"});
    //If the user escapes or enters an empty string in the inputbox, then exit the function
    if(functionName === undefined || functionName === ''){
        return;
    }
    const pickFile = await vscode.window.showQuickPick( [{label: "Pick a file for the MakeFile"}, ...files], {
        ignoreFocusOut : true,
        placeHolder : "Select a file.",
    });
    if (pickFile === undefined){ //user escapes the selection
        return;
    }else if (pickFile) {
        var picked = pickFile;
    }

    //for (var i = 0; i < files.length; i++) {
        fs.writeFileSync(filePath, functionName + ': '+ picked +"\n" + "\t g++ " + picked.replace(".cpp",".o") + " -o " + functionName + " \n", 
        {
            encoding: "utf8",
            flag: "a+",
            mode: 0o666
          });
    //}
    
}