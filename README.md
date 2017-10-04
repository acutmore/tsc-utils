# Typescript tools

Useful scripts for Typescript projects. 'pipeable' input and output for easy composition.

## getTypes.js

```bash
> echo "class Foo extends Bar {}" | node getTypes.js
< Bar
> echo "let a: Car; let b: Zar;" | node getTypes.js
> Car
> Zar
```

## createImports.js

Given a type look up json file:

```bash
> echo '{ "Bar" : "./interfaces/Bar.d.ts" }' > interface-lookup.json
```

Generates import statements that will have the correct path for a given output file. The paths in the json file are resolved relative to the json file. An import will be generated for each type passed to stdin. 

```bash
> echo "Bar" | node ./createImports.js ./interface-lookup.json ./src/ui/output.ts
< import Bar from '../../interfaces/Bar';
```

## example composition

Add the required import statements to a given file `$src`

```bash
> echo "$(node getTypes.js $src | node createImports.js ./lookup.json $src)\n$(cat $src)" 
```
