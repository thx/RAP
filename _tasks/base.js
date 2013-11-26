module.exports = function(grunt) {

  var request = require('request')
  var unzip = require('unzip')
  var fs = require('fs')
  var glob = require('glob')
  var path = require('path')
  var Q = require('q')

  grunt.registerTask('base', function(command /* push|pull */, source /* github */) {
    var done = this.async()
    var basePath = path.resolve(process.cwd(), '../base')

    function copy(pattern, options, target) {
      target = target || process.cwd()
      options = options || {}
      var d = Q.defer()
      var cwd = options.cwd || process.cwd()

      glob(pattern, options, function(err, entries) {
        if (err) grunt.fail.fatal(err)

        Q.all(entries.map(function(entry) {
          var fpath = path.join(target, entry)
          var d = Q.defer()

          if (fs.existsSync(fpath)) {
            grunt.log.writeln('Updated ' + entry)
            fs.createReadStream(path.join(cwd, entry))
              .pipe(fs.createWriteStream(fpath))
              .on('finish', function() {
                d.resolve()
              })
          }

          return d.promise
        })).done(function() {
          d.resolve()
        })
      })

      return d.promise
    }

    function pull() {
      if (source === 'github') {
        request('https://github.com/thx/base/archive/master.zip')
          .pipe(unzip.Parse())
          .on('entry', function(entry) {
            var epath = entry.path
            var fpath = epath.replace(/^[^\/]+\//, '')

            if (/_includes|assets|_tasks/.test(epath) && !/\/$/.test(epath)) {
              entry.pipe(fs.createWriteStream(fpath))
              grunt.log.writeln('Updated ' + fpath)
            }
            else {
              grunt.log.writeln('Skipped ' + fpath)
            }
          })
          .on('close', done)
      }
      else {
        Q.all([
          copy('_includes/*.html', { cwd: basePath }),
          copy('_tasks/*.js', { cwd: basePath }),
          copy('assets/**/*.{css,jpg,png,js}', { cwd: basePath })
        ]).done(done)
      }
    }

    function push() {
      Q.all([
        copy('_includes/*.html', null, basePath),
        copy('_tasks/*.js', null, basePath),
        copy('assets/base.css', null, basePath),
        copy('assets/post.js', null, basePath),
        copy('assets/img/bg.jpg', null, basePath),
        copy('assets/syntax/*.css', null, basePath)
      ]).done(done)
    }

    return command === 'push' ? push() : pull()
  })
}