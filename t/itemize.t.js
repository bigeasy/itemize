require('proof')(2, prove)

function prove (assert) {
    var parser = require('..')

    assert(parser('key value'), { key: 'value' }, 'key value')
    assert(parser('value'), 'value', 'string')
}
