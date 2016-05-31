function Parser () {
}

Parser.prototype._name = function (rest) {
    $ = /^(\s*)([\w'"<])(.*)$/.exec(string)
    switch ($[2]) {
    case '"':
    case "'":
    case '<':
        this._string(string)
        break
    default:
        this._naked(string)
        break
    }
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
        this._naked(string)
        break
    }
}

module.exports = Parser
