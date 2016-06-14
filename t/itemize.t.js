require('proof')(5, prove)

function prove (assert) {
    var parser = require('..')

    assert(parser('key value'), { key: 'value' }, 'key value')
    assert(parser('value'), 'value', 'string')
    assert(parser('null'), null, 'null')
    assert(parser('1'), 1, 'number')
    assert(parser('"null"'), 'null', 'quoted string null')
// TODO Catenation.
// TODO Floating point numbers.
// TODO Special numbers.
// TODO Arrays.
// TODO Objects.
}
