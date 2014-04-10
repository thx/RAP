module.exports = class Liquid extends require("./block")
  # we don't need markup to open this block
  constructor: (tokens, @template) ->
    @parse(tokens)

  # There isn't a real delimter
  blockDelimiter: ->
    []

  # Document blocks don't need to be terminated since they are
  # not actually opened
  assertMissingDelimitation: ->
