async = require("./async")

module.exports =
  scan: (string, regexp, globalMatch = false) ->
    result = []

    _scan = (s) ->
      match = regexp.exec(s)

      if match
        if match.length == 1
          result.push match[0]
        else
          result.push match[1..]

        l = match[0].length
        l = 1 if globalMatch

        if match.index + l < s.length
          _scan(s.substring(match.index + l))

    _scan(string)
    result

  functionName: (f) ->
    return f.__name__ if f.__name__
    return f.name if f.name
    f.toString().match(/\W*function\s+([\w\$]+)\(/)?[1]