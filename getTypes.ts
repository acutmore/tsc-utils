/**
 * getTypes.ts
 * Reads file contents from stdin and outputs list of references types
 */

import * as ts from "typescript";
import {getStdIn} from './util/stdin';

function getTypes(sourceFile: ts.SourceFile, cb: (t: string) => void) {
    const set = new Set<string>();
    processNode(sourceFile);

    function processType(s: string) {
        const type = s.trim().split('.')[0];
        if (! set.has(type)) {
            set.add(type);
            cb(type);
        } 
    }

    function processNode(node: ts.Node) {
        if (ts.isTypeReferenceNode(node)) {
            processType(node.typeName.getFullText(sourceFile));
        }
        if (ts.isExpressionWithTypeArguments(node)) {
            processType(node.getFullText(sourceFile));
        }
        ts.forEachChild(node, processNode);
    }
}

getStdIn()
    .then(contents =>  ts.createSourceFile('stdin', contents, ts.ScriptTarget.Latest))
    .then(sourceFile => getTypes(sourceFile, console.log));
