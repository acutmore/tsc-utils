/**
 * createImports.ts
 * when called with the path to a typescript file,
 * and the path to a json file listing where types are
 * will print the required import statements for each type passed to stdin
 */

/// <reference types="node" />

import * as Path from 'path';
import * as ReadLine from 'readline';

const filePath = Path.dirname(Path.resolve(process.cwd(),  process.argv[3]));
const typeLocationsPath = Path.resolve(process.cwd(),  process.argv[2]);
const typeLocationsDir = Path.dirname(typeLocationsPath);
const typeLocations: { [type: string]: string } = require(typeLocationsPath);

Object.keys(typeLocations).forEach(key => {
  const typeLocation = typeLocations[key];
  const fullPath = Path.resolve(typeLocationsDir, typeLocation);
  typeLocations[key] = fullPath;
});

function resolve(type: string): string | undefined {
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

rl.on('line', (type: string) => {
  const s = resolve(type);
  if (s !== undefined) {
    console.log(s)
  }
});
