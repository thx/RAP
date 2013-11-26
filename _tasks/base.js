module.exports = function(grunt) {

  var request = require('request')
  var unzip = require('unzip')
  var fs = require('fs')
  var glob = require('glob')
  var path = require('path')
  var Q = require('q')

  grunt.registerTask('base', function(command) {
    var done = this.async()

    function pull() {
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
    }

    function push() {
      var basePath = path.resolve(process.cwd(), '../base')

      function search(pattern) {
        var d = Q.defer()

        glob(pattern, function copy(err, entries) {
          if (err) grunt.fail.fatal(err)

          entries.forEach(function(entry) {
            var fpath = path.join(basePath, entry)

            if (fs.existsSync(fpath)) {
              grunt.log.writeln('Updated ' + entry)
              fs.createReadStream(entry).pipe(fs.createWriteStream(fpath))
            }
          })
          d.resolve()
        })

        return d.promise
      }

      Q.all([
        search('_includes/*.html'),
        search('assets/**/*.css')
      ]).done(done)
    }

    return command === 'push' ? push() : pull()
  })
}