import * as vscode from 'vscode';
const fs = require('fs');
import path = require('path');

var targetExecutable;
const objectFileCreateArray : string[] = [];

//TODO: Think about the vscode.uri instead of a string
export async function makefileBuilder (filePath: string, files : any): Promise <any>{ //note add .h files as options to pull up

    const functionName = await vscode.window.showInputBox({prompt: "Input the function name"});
    //If the user escapes or enters an empty string in the inputbox, then exit the function
    if(functionName === undefined || functionName === ''){
        return;
    }
    const pickFiles = await vscode.window.showQuickPick(files, {
        ignoreFocusOut : true,
        placeHolder : "Select a file(s).",
        canPickMany: true, //enable multiple selection
    });
    if (!pickFiles || pickFiles.length === 0){ //user escapes the selection
        return;
    }else  {
        // Process each selected file and concatenate the results into a single string/generates the string of source files : file1.o file2.o file3.o
        targetExecutable = pickFiles.map(pickedFile => pickedFile.replace(".cpp", ".o")).join(' ');
        console.log(targetExecutable);
        
        //Process the selected files into an object file creator dialoge
        pickFiles.forEach(pickedFile => {
            const outputFileName = pickedFile.replace(".cpp", ".o");
            const objectFileCreate = outputFileName + ": " + pickedFile +"\n" + "\t g++ " + pickedFile + " -c " ;
            objectFileCreateArray.push(objectFileCreate);
            console.log(objectFileCreate);
            // Now 'result' contains the formatted output for each picked file.
            // You can use or store 'result' as needed in your code.
        });
    }
    const objectFile = "main.o";
    fs.writeFileSync(
        filePath, 
        //functionName + ': '+ picked +"\n" + "\t gcc " + picked + " -o " + functionName + " \n",
        functionName + ': '+ targetExecutable +"\n" + "\t g++ " + targetExecutable + " -o " + functionName + " \n"+ objectFileCreateArray.join('\n') + " \n" + "clean: \n" + "\t rm -f *.o "+ functionName,  
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
    terminal.sendText("./" + functionName);
    // Reset objectFileCreateArray to have no values
    objectFileCreateArray.length = 0;
}
/*
testingMake: main.o helper.o
	g++ main.o helper.o -o testingMake

main.o: main.cpp
	g++ main.cpp -c

helper.o: helper.cpp helper.h
	g++ helper.cpp -c

clean:
	rm -f *.o testingMake
*/
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