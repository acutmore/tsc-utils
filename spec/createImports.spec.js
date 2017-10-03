const t = require('tap');
const child_process = require('child_process');
const consume = require('../util/stdin').consume;

function run(t, input, outputPath, expected) {
    const sut = child_process.spawn(process.execPath, ['./createImports.js', './spec/createImports.data.json', outputPath]);
    const assertion = consume(sut.stdout)
        .then(data => {
            t.equal(data, expected.join('\n') + '\n');
        });
    sut.stdin.write(input);
    sut.stdin.end();
    return assertion;
}

t.test('type and output in same folder', function (t) {
    return run(t, 'Foo', './spec/outputFile.ts', [`import Foo from './Foo'`])
    .then(t.end);
});
