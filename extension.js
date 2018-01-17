// The module 'vscode' contains the VS Code extensibility API Import the module
// and reference it with the alias vscode in your code below
const vscode = require('vscode');
const DocumentRender = require('./render');
// this method is called when your extension is activated your extension is
// activated the very first time the command is executed
function activate(context) {
    // let textDocumentContentProvider = new
    // TextDocumentContentProvider(context.extensionPath +
    // "/swagger-ui/index.html"); The command has been defined in the package.json
    // file Now provide the implementation of the command with  registerCommand The
    // commandId parameter must match the command field in package.json
    let render = new DocumentRender(context);
    let disposable = vscode
        .commands
        .registerCommand('extension.previewInSide', function () {
            // The code you place here will be executed every time your command is executed
            var editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let text = editor
                .document
                .getText();
            let uri = render.render(editor.document.fileName, text);
            vscode
                .commands
                .executeCommand('vscode.previewHtml', uri , vscode.ViewColumn.Two, "OpenAPI Preview")
                .then(null, reason => {
                    vscode
                        .window
                        .showErrorMessage(reason);
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