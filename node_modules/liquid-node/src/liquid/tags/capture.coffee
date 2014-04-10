Liquid = require "../../liquid"

# Capture stores the result of a block into a variable without rendering it inplace.
#
#   {% capture heading %}
#     Monkeys!
#   {% endcapture %}
#   ...
#   <h1>{{ heading }}</h1>
#
# Capture is useful for saving content for use later in your template, such as
# in a sidebar or footer.
#
module.exports = class Capture extends Liquid.Block
  Syntax = /(\w+)/
  SyntaxHelp = "Syntax Error in 'capture' - Valid syntax: capture [var]"

  constructor: (tagName, markup, tokens) ->
    match = Syntax.exec(markup)

    if match
      @to = match[1]
    else
      throw new Liquid.SyntaxError(SyntaxHelp)

    super

  render: (context) ->
    output = super
    context.lastScope()[@to] = output
    ""

Liquid.Template.registerTag 'capture', Capture
