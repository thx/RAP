Liquid = require("./liquid")
util = require "util"

# based on node's lib/assert.js
customError = (name, inherit = global.Error) ->
  error = (message) ->
    @name = name
    @message = message

    if global.Error.captureStackTrace
      global.Error.captureStackTrace(@, arguments.callee)

  util.inherits(error, inherit)
  error:: = inherit::
  error

Liquid.Error = customError "Error"

# Errors
[ "ArgumentError", "ContextError", "FilterNotFound",
  "FilterNotFound", "FileSystemError", "StandardError",
  "StackLevelError", "SyntaxError"
].forEach (className) ->

  Liquid[className] = customError("Liquid.#{className}", Liquid.Error)

Liquid.Helpers          = require("./liquid/helpers")
Liquid.Drop             = require("./liquid/drop")
Liquid.Strainer         = require("./liquid/strainer")
Liquid.Context          = require("./liquid/context")
Liquid.Tag              = require("./liquid/tag")
Liquid.Block            = require("./liquid/block")
Liquid.Document         = require("./liquid/document")
Liquid.Variable         = require("./liquid/variable")
Liquid.Template         = require("./liquid/template")
Liquid.StandardFilters  = require("./liquid/standard_filters")
Liquid.Condition        = require("./liquid/condition")
Liquid.ElseCondition    = require("./liquid/else_condition")

Liquid.Template.registerFilter(Liquid.StandardFilters)

Liquid.Assign           = require("./liquid/tags/assign")
Liquid.Capture          = require("./liquid/tags/capture")
Liquid.Comment          = require("./liquid/tags/comment")
Liquid.Decrement        = require("./liquid/tags/decrement")
Liquid.For              = require("./liquid/tags/for")
Liquid.If               = require("./liquid/tags/if")
Liquid.Ifchanged        = require("./liquid/tags/ifchanged")
Liquid.Increment        = require("./liquid/tags/increment")
Liquid.Raw              = require("./liquid/tags/raw")
Liquid.Unless           = require("./liquid/tags/unless")

module.exports = Liquid