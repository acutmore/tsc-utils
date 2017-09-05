/**
 * getTypes.ts
 * Reads file contents from stdin and outputs list of references types
 */

import * as ts from "typescript";
import {getStdIn} from './util/stdin';

function getTypes(sourceFile: ts.SourceFile, cb: (t: string) => void) {
    const set = new Set<string>();
    processNode(sourceFile);

    function processNode(node: ts.Node) {
        if (ts.isTypeReferenceNode(node)) {
            const type = node.typeName.getFullText(sourceFile).trim();
            if (! set.has(type)) {
                set.add(type);
                cb(node.typeName.getFullText(sourceFile).trim());
            }
        }
        ts.forEachChild(node, processNode);
    }
}

getStdIn()
    .then(contents =>  ts.createSourceFile('stdin', contents, ts.ScriptTarget.Latest))
    .then(sourceFile => getTypes(sourceFile, console.log));
