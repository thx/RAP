_ = require("underscore")._

module.exports = class Strainer

  constructor: (@context) ->

  @globalFilter: (filter) ->
    _.extend Strainer::, filter

  @create: (context) ->
    new Strainer(context)
