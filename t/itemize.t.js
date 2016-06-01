require('proof')(1, prove)

function prove (assert) {
    var parser = require('..')

    assert(parser('key value'), { key: 'value' }, 'key value')
}
