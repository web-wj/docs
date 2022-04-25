const vscode = require('vscode');

function reaplaceTextByVscodeAPI(newText) {
    // get the Range of the whole text of a document
    let textEditor = vscode.window.activeTextEditor
    let firstLine = textEditor.document.lineAt(0);
    let lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
    let textRange = new vscode.Range(0,
        firstLine.range.start.character,
        textEditor.document.lineCount - 1,
        lastLine.range.end.character);

    // Replace documents with vscode API
    let uri = vscode.window.activeTextEditor.document.uri
    let textEdits = [];
    textEdits.push(new vscode.TextEdit(textRange, newText))
    let workspaceEdit = new vscode.WorkspaceEdit()
    workspaceEdit.set(uri, textEdits)
    vscode.workspace.applyEdit(workspaceEdit)
}

function activate(context) {
    let format = vscode.commands.registerCommand('extension.format', function() {
        let originText = vscode.window.activeTextEditor.document.getText()

        // get all image code without <a></a>
        let getAllImgCodeRegex = /\!\[[^\[\]]*\]\([^\(\)]*\)(?!<\/a>)/g
        let imgCode = originText.match(getAllImgCodeRegex)

        if (imgCode) {
            let newImgCode = imgCode.map((item) => {
                let title = item.substring(item.indexOf('[') + 1, item.indexOf(']'))
                let url = item.substring(item.indexOf('(') + 1, item.indexOf(')'))
                let newItem = `<a data-fancybox title="${title}" href="${url}">${item}</a>`
                return newItem
            })

            // replace all image code
            let newText
            let dynamicText = originText
            let getOneImgCodeRegex = /\!\[[^\[\]]*\]\([^\(\)]*\)(?!<\/a>)/
            for (let i = 0; i < imgCode.length; i++) {
                newText = dynamicText.replace(getOneImgCodeRegex, newImgCode[i])
                dynamicText = newText
            }

            reaplaceTextByVscodeAPI(newText)
            vscode.window.showInformationMessage('Formatting success.');
        } else {
            vscode.window.showInformationMessage('Formatting has been completed.');
        }
    });

    let resetFormat = vscode.commands.registerCommand('extension.resetFormat', function() {
        let originText = vscode.window.activeTextEditor.document.getText()

        // get all image code without <a></a>
        let getAllImgCodeRegex = /<a[^<]*(?=<\/a>)<\/a>/g
        let imgCode = originText.match(getAllImgCodeRegex)

        if (imgCode) {
            let newImgCode = imgCode.map((item) => {
                let newItem = item.substring(item.indexOf('!'), item.indexOf(')') + 1)
                return newItem
            })

            // replace all image code
            let newText
            let dynamicText = originText
            let getOneImgCodeRegex = /<a[^<]*(?=<\/a>)<\/a>/
            for (let i = 0; i < imgCode.length; i++) {
                newText = dynamicText.replace(getOneImgCodeRegex, newImgCode[i])
                dynamicText = newText
            }

            reaplaceTextByVscodeAPI(newText)
            vscode.window.showInformationMessage('Reset formatting success');
        } else {
            vscode.window.showInformationMessage('Reset formatting completed');
        }
    });

    context.subscriptions.push(format, resetFormat);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate
