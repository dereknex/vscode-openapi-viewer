const nunjucks = require('nunjucks');
const fs = require('fs');
const vscode = require('vscode');

const path = require('path');
const jsyaml = require('js-yaml');

module.exports = class DocumentRender{
    constructor(context) {
        this.context = context;
    }

    render(filename, text) {
        let content = "";
        let ext = path.extname(filename);
        if (ext == ".json") {
            content = JSON.parse(text);
        }else if (ext == ".yaml" || ext == ".yml") {
           content = jsyaml.safeLoad(text);
            // content = JSON.stringify(yaml);
        } else {
            return "";
        }
        let swaggerUIPath = this.context.extensionPath + "/swagger-ui";
        let template = this.context.extensionPath + "/swagger-ui/index.njk";
        let destFile = this.context.extensionPath + "/swagger-ui/index.htm";
        
        let res = nunjucks.render(template, {swaggerUIPath: swaggerUIPath, content: content});
        fs.writeFileSync(destFile, res);
        return vscode.Uri.parse('file://' + destFile);
    }
}