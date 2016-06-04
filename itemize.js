function Parser (string) {
    this._offset = 0
}

Parser.prototype._name = function (remaining) {
    var $ = /^([^\S\n]*)([\w'"<])(.*)$/.exec(remaining)
    switch ($[2]) {
    case '\n':
        this._newline($[3])
        throw new Error
        break
    case '"':
    case "'":
    case '<':
        return this._quoted($[1], $[2], $[3])
    default:
        return this._unquoted($[1], $[2], $[3])
    }
}

Parser.prototype._unquoted = function (spaces, first, remaining) {
    this._offset += spaces.length + 1
    var $ = /^([^\s<'"]*)(.*)$/.exec(remaining)
    return { value: first + $[1], remaining: $[2], unquoted: true }
}

Parser.prototype._value = function (string) {
    var $

    $ = /^(\s*)(\S)(.*)$/.exec(string)
    switch ($[2]) {
    case '"':
    case "'":
    case '<':
        this._string(string)
        break
    case '[':
        this._array(string)
        break
    case '{':
    case '(':
        this._object($[1], string)
        break
    default:
        return this._unquoted($[1], $[2], $[3])
        break
    }
}

Parser.prototype.parse = function (string) {
    var name = this._name(string)
    if (/\S/.test(name.remaining)) {
        var value = this._value(name.remaining)
        var object = {}
        object[name.value] = value.value
        return object
    }
    // TODO Check if null or number.
    return name.value
}

module.exports = function (string) {
    return new Parser().parse(string)
}
