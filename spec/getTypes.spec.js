const t = require('tap');
const child_process = require('child_process');
const consume = require('../util/stdin').consume;

function run(t, input, types) {
    const sut = child_process.spawn(process.execPath, ['./getTypes.js']);
    const assertion = consume(sut.stdout)
        .then(data => {
            t.equal(data, types.join('\n') + '\n');
        });
    sut.stdin.write(input);
    sut.stdin.end();
    return assertion;
}

t.test('variable declaration type', function (t) {
    return run(t, `
        declare const stream: Rx.Observable;
    `, ['Rx']
    )
    .then(t.end);
});

t.test('class declaration', function (t) {
    return run(t, `
        class Foo extends Bar implements Car, Zar {};
    `, ['Bar', 'Car', 'Zar']
    )
    .then(t.end);
});

