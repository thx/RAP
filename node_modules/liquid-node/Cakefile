{exec} = require 'child_process'
fs = require 'fs'

task 'build', 'Build project from src/*.coffee to lib/*.js', ->
  exec 'coffee --compile --output lib/ src/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'browserify', 'Bundle project in a single .js file for use in browsers', ->
  exec 'browserify lib/index.js -o dist/liquid.js', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
