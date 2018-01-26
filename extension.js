// The module 'vscode' contains the VS Code extensibility API Import the module
// and reference it with the alias vscode in your code below
const vscode = require('vscode');
const DocumentRender = require('./render');
// this method is called when your extension is activated your extension is
// activated the very first time the command is executed

function preview(context) {
    let render = new DocumentRender(context);
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let text = editor
        .document
        .getText();
    let uri = render.render(editor.document.fileName, text);
    vscode.window.showErrorMessage(uri);
    vscode
        .commands
        .executeCommand('vscode.previewHtml', uri , vscode.ViewColumn.Two, "OpenAPI Preview")
        .then(null, reason => {
            vscode
                .window
                .showErrorMessage(reason);
        });
}

function activate(context) {
    // console.log("openapi view activate");
    
    let disposable = vscode
        .commands
        .registerCommand('extension.previewInSide', function () {
            preview(context);
            vscode.workspace.onDidSaveTextDocument((event) => {
                if (event.fileName == vscode.window.activeTextEditor.document.fileName) {
                    preview(context);
                }
            });
        });
    
    context
        .subscriptions
        .push(disposable);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;