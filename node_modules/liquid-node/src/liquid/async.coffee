Q = require "q"
async = require "async"

nodeify = (deferred) ->
  (err, result) ->
    if err then deferred.reject(err) else deferred.resolve(result)

denodify = (cb) ->
  [
    (result) -> cb null, result
    (error) -> cb error
  ]

module.exports = Async =

  # Resolves when all items are resolved.
  forEach: (array, callback) ->
    Async.promise (deferred) ->
      iterator = (item, cb) ->
        Q.when(item).then((i) -> callback(i)).nodeify cb

      async.forEachSeries array, iterator, nodeify(deferred)

  map: (array, callback) ->
    Async.promise (deferred) ->
      c = 0
      iterator = (item, cb) ->
        Q.when(item).then((i) -> callback(i, c++)).nodeify cb

      async.mapSeries array, iterator, nodeify(deferred)

  reduce: (array, callback, memo) ->
    Async.promise (deferred) ->
      Q.when(memo).then (memo) ->
        iterator = (memo, item, cb) ->
          Q.when(item).then((i) -> callback(memo, i)).nodeify cb

        async.reduce array, memo, iterator, nodeify(deferred)

  some: (array, callback) ->
    Async.promise (deferred) ->
      iterator = (item, cb) ->
        Q.when(item).then((i) -> callback(i)).then(((v) -> cb(v)), deferred.reject)

      async.some array, iterator, (r) -> deferred.resolve r

  detect: (array, callback) ->
    Async.promise (deferred) ->
      iterator = (item, cb) ->
        Q.when(item).then((i) -> callback(i)).then(((v) -> cb(v)), deferred.reject)

      async.detectSeries array, iterator, (r) -> deferred.resolve(r)

  promise: (callback) ->
    deferred = Q.defer()

    try
      callback deferred
    catch e
      deferred.reject e

    deferred.promise

module.exports = Async

return

# A few simple tests

aPost = ->
  return {
    getAuthor: ->
      async.promise (p) ->
        setTimeout(
          (-> p.resolve({ name: "Albert" })),
          0
        )
  }

getPosts = ->
  async.promise (p) ->
    setTimeout(
      (-> p.resolve([aPost()])),
      10
    )

reducer = (prev, next) ->
  if next == 0 then throw new Error("Division by zero.")
  Q.delay(1).then(-> prev / next)

Async.reduce([2, 5, 10], reducer, 100).nodeify -> console.log "Reduce 1: %j", arguments
Async.reduce([2, 5,  0], reducer, 100).nodeify (err) -> console.log "Reduce 2: %s", err

mapper = (item) -> Q.delay(1).then -> item + 1
Async.map([1,2,3], mapper).nodeify -> console.log "Map 1: %j", arguments

detector = (item) -> Q.delay(1).then -> item % 42 == 0
Async.some([1,5,7], detector).nodeify -> console.log "Some 1: %j", arguments
Async.some([1,5,42], detector).nodeify -> console.log "Some 2: %j", arguments

Async.detect([1,5,7], detector).nodeify -> console.log "Detect 1: %j", arguments
Async.detect([1,5,84], detector).nodeify -> console.log "Detect 2: %j", arguments

getPosts()
  .then (posts) ->
    console.log "Received posts."
    posts[0].getAuthor()
  .then (v) ->
    console.log "Received author."
    v
  .then (author) ->
    author.name
  .then (name) ->
    console.log "Name: %s", name
    name
  .timeout(500)
  .fail (e) ->
    console.log "Failed: %s.", e
  .done ->
    console.log "Success."
