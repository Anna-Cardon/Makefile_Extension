import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');

//TODO: Think about the vscode.uri instead of a string
export async function makefileBuilder (filePath: string, files : any): Promise <any>{

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
    const objectFile = "main.o";
    fs.writeFileSync(
        filePath, 
        //functionName + ': '+ picked +"\n" + "\t gcc " + picked + " -o " + functionName + " \n",
        functionName + ': '+ picked.replace(".cpp", ".o") +"\n" + "\t g++ " + picked.replace(".cpp",".o") + " -o " + functionName + " \n"+ picked.replace(".cpp",".o") + ': '+ picked +"\n" + "\t g++ " + picked + " -c " + " \n" + "clean: \n" + "\t rm -f *.o ",  
        {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
        }
    );

    //Talks to the terminal and executes but need to edit the makefile content to be correct for no error, plus add error handling
    const terminal = vscode.window.createTerminal(`Ext Terminal Make`);
    terminal.sendText("make clean");
    terminal.sendText("make");

}

//what if the student updates files and wants to run the make, add options to go forward if a makefile already exists
//update my readme file
// published the extension for distribution or email

// functionName + ': '+ picked.string.replace(".cpp", ".o") +"\n" 
//         + "\t gcc " + picked.string.replace(".cpp",".o") + " -o " + functionName + " \n"
//         + objectFile + ': '+ picked +"\n" 
//         + "\t gcc " + picked + " -c " + " \n" 
//         + "clean : \n" + "\t rrm *.o ", 


// test3: main.o
// 	 gcc main.o -o test3 

// main.o: main.cpp
// 	gcc main.cpp -c

// //update for the three step process: 1. create main.o (an object file) make main.o command run
// // 2. create an executable file called test3 through main.object
// // 3. run test3

// //can also add the make clean command to clear object files
// clean:
// 	rrm *.o 