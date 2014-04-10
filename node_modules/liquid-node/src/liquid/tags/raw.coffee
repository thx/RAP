Liquid = require "../../liquid"

module.exports = class Raw extends Liquid.Block
  parse: (tokens) ->
    @nodelist or= []
    @nodelist.pop() while @nodelist.length > 0

    while tokens.length > 0
      token = tokens.shift()
      match = Liquid.Block.FullToken.exec(token)

      if match and @blockDelimiter() is match[1]
        @endTag()
        break
      else if token.length > 0
        @nodelist.push(token)

Liquid.Template.registerTag "raw", Raw
