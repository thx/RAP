Liquid = require "../../liquid"
{ _ } = require "underscore"
Q = require "q"

module.exports = class If extends Liquid.Block
  SyntaxHelp = "Syntax Error in tag 'if' - Valid syntax: if [expression]"

  Syntax = ///
      (#{Liquid.QuotedFragment.source})\s*
      ([=!<>a-z_]+)?\s*
      (#{Liquid.QuotedFragment.source})?
    ///

  ExpressionsAndOperators = ///
    (?:
      \b(?:\s?and\s?|\s?or\s?)\b
      |
      (?:\s*
        (?!\b(?:\s?and\s?|\s?or\s?)\b)
        (?:#{Liquid.QuotedFragment.source}|\S+)
      \s*)
    +)
  ///

  constructor: (tagName, markup, tokens) ->
    @blocks = []
    @pushBlock('if', markup)
    super

  unknownTag: (tag, markup, tokens) ->
    if ["elsif", "else"].indexOf(tag) >= 0
      @pushBlock(tag, markup)
    else
      super

  render: (context) ->
    context.stack =>
      firstBlock = Liquid.async.detect @blocks, (block) ->
        Q.when(block.evaluate(context)).then (ok) ->
          if block.negate then !ok else ok

      firstBlock.then (block) =>
        return "" unless block?
        @renderAll(block.attachment, context)

  # private

  pushBlock: (tag, markup) ->
    block = if tag == "else"
      new Liquid.ElseCondition()
    else
      expressions = Liquid.Helpers.scan(markup, ExpressionsAndOperators)
      expressions = expressions.reverse()
      match = Syntax.exec expressions.shift()

      throw new Liquid.SyntaxError(SyntaxHelp) unless match

      condition = new Liquid.Condition(match[1..3]...)

      while expressions.length > 0
        operator = String(expressions.shift()).trim()

        match = Syntax.exec expressions.shift()
        throw new SyntaxError(SyntaxHelp) unless match

        newCondition = new Liquid.Condition(match[1..3]...)
        newCondition[operator].call(newCondition, condition)
        condition = newCondition

      condition

    @blocks.push block
    @nodelist = block.attach([])

Liquid.Template.registerTag "if", If
