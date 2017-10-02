"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
function consume(stream) {
    const ret = [];
    let len = 0;
    return new Promise(resolve => {
        if (stream.isTTY) {
            resolve('');
        }
        else {
            stream.on('readable', () => {
                let chunk;
                while ((chunk = stream.read())) {
                    ret.push(chunk);
                    len += chunk.length;
                }
            });
            stream.on('end', () => {
                resolve(Buffer.concat(ret, len).toString('utf8'));
            });
        }
    });
}
exports.consume = consume;
function getStdIn() {
    return consume(process.stdin);
}
exports.getStdIn = getStdIn;
