Liquid = require "../liquid"
{ _ } = require "underscore"
Q = require "q"

# Container for liquid nodes which conveniently wraps decision making logic
#
# Example:
#
#   c = Condition.new('1', '==', '1')
#   c.evaluate #=> true
#
module.exports = class Condition
  @operators =
    '==': (cond, left, right) ->  cond.equalVariables(left, right)
    '!=': (cond, left, right) -> !cond.equalVariables(left, right)
    '<>': (cond, left, right) -> !cond.equalVariables(left, right)
    '<':  (cond, left, right) -> left < right
    '>':  (cond, left, right) -> left > right
    '<=': (cond, left, right) -> left <= right
    '>=': (cond, left, right) -> left >= right
    'contains': (cond, left, right) ->
      if left and right
        left.indexOf(right) >= 0
      else
        false

  operators: ->
    Liquid.Condition.operators

  constructor: (@left, @operator, @right) ->
    @childRelation = null
    @childCondition = null

  evaluate: (context) ->
    context or= new Liquid.Context()

    result = @interpretCondition(@left, @right, @operator, context)

    switch @childRelation
      when "or"
        Q.when(result).then (result) =>
          result or @childCondition.evaluate(context)
      when "and"
        Q.when(result).then (result) =>
          result and @childCondition.evaluate(context)
      else
        result

  or: (@childCondition) ->
    @childRelation = "or"

  and: (@childCondition) ->
    @childRelation = "and"

  # Returns parameter
  attach: (attachment) ->
    @attachment = attachment
    attachment

  else: ->
    false

  inspect: ->
    operands = _([@left, @operator, @right]).compact().join('#')
    "<Condition [#{operands}], attachment: #{@attachment}>"

  # private API

  equalVariables: (left, right) ->
    # TODO: symbol stuff?
    left == right

  interpretCondition: (left, right, op, context) ->
    # If the operator is empty this means that the decision statement is just
    # a single variable. We can just poll this variable from the context and
    # return this as the result.
    return context.get(left) unless op?

    operation = Condition.operators[op]
    throw new Error("Unknown operator #{op}") unless operation?

    left = context.get(left)
    right = context.get(right)

    Q.when(left).then (left) =>
      Q.when(right).then (right) =>
        operation @, left, right
