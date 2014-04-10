Liquid = require "../../liquid"
Q = require "q"

module.exports = class Ifchanged extends Liquid.Block
  render: (context) ->
    context.stack =>
      rendered = @renderAll(@nodelist, context)

      Q.when(rendered)
        .then (output) ->
          if output != context.registers["ifchanged"]
            context.registers["ifchanged"] = output
            output
          else
            ""

Liquid.Template.registerTag "ifchanged", Ifchanged
