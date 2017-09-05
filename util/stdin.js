"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
function getStdIn() {
    const ret = [];
    const stdin = process.stdin;
    let len = 0;
    return new Promise(resolve => {
        if (stdin.isTTY) {
            resolve('');
        }
        else {
            stdin.on('readable', () => {
                let chunk;
                while ((chunk = stdin.read())) {
                    ret.push(chunk);
                    len += chunk.length;
                }
            });
            stdin.on('end', () => {
                resolve(Buffer.concat(ret, len).toString('utf8'));
            });
        }
    });
}
exports.getStdIn = getStdIn;
