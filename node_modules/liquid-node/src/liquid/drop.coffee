_ = require("underscore")._

# A drop in liquid is a class which allows you to to export DOM
# like things to liquid.
# Methods of drops are callable.
# The main use for liquid drops is the implement lazy loaded objects.
# If you would like to make data available to the web designers
# which you don't want loaded unless needed then a drop is a great
# way to do that
#
# Example:
#
#   ProductDrop = Liquid.Drop.extend
#     topSales: ->
#       Shop.current.products.all order: 'sales', limit: 10
#
#   tmpl = Liquid.Template.parse """
#     {% for product in product.top_sales %}
#       {{ product.name }}
#     {%endfor%}
#     """
#
#   tmpl.render(product: new ProductDrop) # will invoke topSales query.
#
# Your drop can either implement the methods sans any parameters or implement the
# before_method(name) method which is a
# catch all
module.exports = class Drop

  @extend: (impl) ->
    klass = class Droplet extends Drop

  hasKey: (key) ->
    true

  invokeDrop: (methodOrKey) ->
    if methodOrKey and methodOrKey != '' and @[methodOrKey]?
      if typeof(@[methodOrKey]) == "function"
        @[methodOrKey].call(@)
    else
      @beforeMethod(methodOrKey)

  # Catch all for the method
  beforeMethod: (method) ->
    undefined

  get: (methodOrKey) ->
    invokeDrop(methodOrKey)

  toLiquid: ->
    @
