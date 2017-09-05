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
    function processNode(node) {
        if (ts.isTypeReferenceNode(node)) {
            const type = node.typeName.getFullText(sourceFile).trim();
            if (!set.has(type)) {
                set.add(type);
                cb(node.typeName.getFullText(sourceFile).trim());
            }
        }
        ts.forEachChild(node, processNode);
    }
}
stdin_1.getStdIn()
    .then(contents => ts.createSourceFile('stdin', contents, ts.ScriptTarget.Latest))
    .then(sourceFile => getTypes(sourceFile, console.log));
