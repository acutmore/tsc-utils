"use strict";
/**
 * createImports.ts
 * when called with the path to a typescript file,
 * and the path to a json file listing where types are
 * will print the required import statements for each type passed to stdin
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node" />
const Path = require("path");
const ReadLine = require("readline");
const filePath = Path.dirname(Path.resolve(process.cwd(), process.argv[3]));
const typeLocationsPath = Path.resolve(process.cwd(), process.argv[2]);
const typeLocationsDir = Path.dirname(typeLocationsPath);
const typeLocations = require(typeLocationsPath);
Object.keys(typeLocations).forEach(key => {
    const typeLocation = typeLocations[key];
    const fullPath = Path.resolve(typeLocationsDir, typeLocation);
    typeLocations[key] = fullPath;
});
function resolve(type) {
    const location = typeLocations[type];
    if (location == null) {
        return undefined;
    }
    const relativePath = Path.relative(filePath, location);
    return `import ${type} from './${relativePath.replace('.d.ts', '')}'`;
}
const rl = ReadLine.createInterface({
    input: process.stdin,
});
rl.on('line', (type) => {
    const s = resolve(type);
    if (s !== undefined) {
        console.log(s);
    }
});
