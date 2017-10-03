"use strict";
/**
 * getTypes.ts
 * Reads file contents from stdin and outputs list of references types
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const stdin_1 = require("./util/stdin");
function getTypes(sourceFile, cb) {
    const set = new Set();
    processNode(sourceFile);
    function processType(s) {
        const type = s.trim().split('.')[0];
        if (!set.has(type)) {
            set.add(type);
            cb(type);
        }
    }
    function processNode(node) {
        if (ts.isTypeReferenceNode(node)) {
            processType(node.typeName.getFullText(sourceFile));
        }
        if (ts.isExpressionWithTypeArguments(node)) {
            processType(node.getFullText(sourceFile));
        }
        ts.forEachChild(node, processNode);
    }
}
stdin_1.getStdIn()
    .then(contents => ts.createSourceFile('stdin', contents, ts.ScriptTarget.Latest))
    .then(sourceFile => getTypes(sourceFile, console.log));
