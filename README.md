# Makefile Extension

## Overview

This Makefile Extension for Visual Studio Code simplifies the process of creating and managing Makefiles for C++ projects. It allows you to generate a Makefile for a specified C++ file, and provides options for handling existing Makefiles.

## Features

- **Automatic Makefile Generation:** Quickly generate a Makefile for a specified C++ file within your project.

- **Makefile Management:**
  - If a Makefile already exists in the project directory, the extension prompts the user to choose between running the current Makefile or creating a new one.
  - If the user chooses to create a new Makefile, they are prompted to specify a function name and the file to link.

## Prerequisites

- Visual Studio Code installed.
- C/C++ extension for Visual Studio Code installed.

## Installation

1. Clone or download this repository to your local machine.

2. Open Visual Studio Code and navigate to the Extensions view (`Ctrl+Shift+X`).

3. Click on the "..." icon and select "Install from VSIX...".

4. Choose the downloaded VSIX file from the cloned/downloaded repository.

5. Reload Visual Studio Code to activate the extension.

## Usage

1. Open a C++ file in Visual Studio Code.

2. Access the editor Run button, open its menu and select "Compile/Run Makefile"

![image](<ReadMe_Files/location.png>)

3. Follow the prompts:
   - If a Makefile exists:
     - Choose to run the current Makefile or create a new one.
     - If creating a new Makefile, specify a function name and the file to link in command pallete.

4. The extension will generate the Makefile for you in the project directory.

## Commands

- **Makefile Extension: Create Makefile:** Trigger the process of creating a Makefile for the specified C++ file.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
