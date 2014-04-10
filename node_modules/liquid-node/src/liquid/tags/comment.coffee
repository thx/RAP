Liquid = require "../../liquid"

module.exports = class Comment extends Liquid.Block
  render: ->
    ""

Liquid.Template.registerTag("comment", Comment)
