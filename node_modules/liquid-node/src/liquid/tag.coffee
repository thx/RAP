module.exports = class Tag
  constructor: (@tagName, @markup, tokens, @template) ->
    @parse(tokens)

  parse: (tokens) ->

  name: ->
    tagName = /^function (\w+)\(/.exec(@constructor.toString())?[1]
    tagName or= 'UnknownTag'
    tagName.toLowerCase()

  render: ->
    ""