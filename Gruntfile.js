module.exports = function(grunt) {

  var request = require('request')
  var unzip = require('unzip')
  var fs = require('fs')


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  })

  grunt.registerTask('update', function() {
    var done = this.async()

    request('https://github.com/thx/base/archive/master.zip')
      .pipe(unzip.Parse())
      .on('entry', function(entry) {
        var epath = entry.path
        var fpath = epath.replace(/^[^\/]+\//, '')

        if (/_includes|assets/.test(epath) && !/\/$/.test(epath)) {
          entry.pipe(fs.createWriteStream(fpath))
          grunt.log.writeln('Updated ' + fpath)
        }
        else {
          grunt.log.writeln('Skipped ' + fpath)
        }
      })
      .on('close', done)
  })
}