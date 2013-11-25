module.exports = function(grunt) {

  var request = require('superagent')
  var unzip = require('unzip')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  })

  grunt.registTask('update', function() {
    request
      .get('https://github.com/thx/base/archive/master.zip')
      .pipe(unzip.Extract({ path: '.' })
  })
}