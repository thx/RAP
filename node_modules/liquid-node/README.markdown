# LiquidNode - The Liquid template engine for Node.js

[![Travis CI Status](https://secure.travis-ci.org/sirlantis/liquid-node.png?branch=master)](https://travis-ci.org/sirlantis/liquid-node)

LiquidNode is a port of the Liquid template engine (originally written in Ruby) to *Node.js*.
It uses Promises to support non-blocking, asynchronous variables/filters/blocks.
Most code has been translated from Ruby to CoffeeScript,
with a few adjustments (casing) to make it feel more *CoffeeScript/JavaScript-ish*.

## How LiquidNode differs from [Liquid](https://github.com/Shopify/liquid/)

Besides being written in CoffeeScript (that easily compiles to JavaScript)
LiquidNode had to solve a problem which Liquid for Ruby didn't have:
the power of Node.js lies in its non-blocking nature and its extensive use of callbacks.

This presents a problem when using sequential/synchronous Liquid-expressions like `{{ store.items | count }}`
which hide one or multiple blocking SQL-queries.

LiquidNode solves that problem by using [Futures and Promises](http://en.wikipedia.org/wiki/Futures_and_promises).
The programmer just has to return a `Promise` from asynchronous functions -
the designer won't have to care about it.

LiquidNode uses the popular [Q implementation](https://github.com/kriskowal/q) of Promises.

## Introduction to the Liquid template engine

Liquid is a template engine which was written with very specific requirements:

* It has to have beautiful and simple markup. Template engines which don't produce good looking markup are no fun to use.
* It needs to be non evaling and secure. Liquid templates are made so that users can edit them. You don't want to run code on your server which your users wrote.
* It has to be stateless. Compile and render steps have to be seperate so that the expensive parsing and compiling can be done once and later on you can just render it passing in a hash with local variables and objects.

## Why you should use Liquid

* You want to allow your users to edit the appearance of your application but don't want them to run **insecure code on your server**.
* You want to render templates directly from the database
* You like smarty (PHP) style template engines
* You need a template engine which does HTML just as well as emails
* You don't like the markup of your current templating engine

## What does it look like?

```html
<ul id="products">
  {% for product in products %}
    <li>
      <h2>{{ product.name }}</h2>
      Only {{ product.price | price }}

      {{ product.description | prettyprint | paragraph }}
    </li>
  {% endfor %}
</ul>
```

## Howto use Liquid

Liquid supports a very simple API based around the Liquid.Template class.
For standard use you can just pass it the content of a file and call render with an object.

```coffeescript
Liquid = require "liquid-node"

template = Liquid.Template.parse("hi {{name}}") # Parses and compiles the template
promise = template.render name: "tobi"          # => [Promise Object]
promise.done console.log                        # >> "hi tobi"
```

## Promises with Q

LiquidNode uses the promise implementation of [Q](https://github.com/kriskowal/q).

```coffeescript
fs = require "fs"
Q  = require "q"

class Server
  name: ->
    "Falkor"

  # A deferred can either be resolved (no error) or rejected (error).
  think: ->
    Q.timeout(1000).then(42)

  # This is an example of how to wait for a Promise:
  patientMethod: ->
    deepThought = @think()
    deepThought.done (answer) -> console.log "The answer is: %s.", answer
    deepThought.fail (e) -> console.log "Universe reset: %s.", e

  # For node-ish callbacks you can use `defer.nodeify`. This
  # will automatically resolve/reject based on the first argument.
  accounts: ->
    deferred = Q.defer()
    fs.readFile "/etc/passwd", "utf-8", deferred.nodeify

  # If you don't want to check, whether an object is a Promise or not
  # just use `Q.when`. It will build a Promise around it if necessary.
  unsure: (promiseWannabe) ->
    Q.when(promiseWannabe)

  # You can chain Promises using `promise.then().then().then()...`.
  # A `then` will be called with the resolution of the previous `then`.
  recipe: ->
    gotoStore()
      .then (store) -> store.getEggs()
      .then (eggs) ->
        # or nest the when-calls
        eggs.split().then (yolk) -> bakeWith(yolk)
      .done (pancake) ->
        console.log "Pancake is ready!"
```

## State of development

I'm developing this project alongside a different project.
I translated a few basic tests from the original Liquid codebase -
but there are hundreds of them.

So if you find a bug-fix or have some time to translate further tests I'll be happy to pull them in.

## Similar libraries

* [darthapo's Liquid.js](https://github.com/darthapo/liquid.js) is liquid ported to JavaScript to be run within the browser. It doesn't handle asynchrony.
* [tchype's Liquid.js](https://github.com/tchype/liquid.js) is `liquid-node` wrapped to run in a browser.

## License

LiquidNode is released under the [MIT license](http://www.opensource.org/licenses/MIT).
