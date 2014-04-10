Liquid = require("../liquid")

module.exports = class ElseCondition extends Liquid.Condition
  else: -> true
  evaluate: -> true
