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
      var cwd = options.cwd || process.cwd()

      glob.sync(pattern, options).forEach(function(entry) {
        var fpath = path.join(target, entry)

        if (fs.existsSync(fpath)) {
          grunt.log.writeln('Updated ' + entry)
          grunt.file.write(fpath, grunt.file.read(path.join(cwd, entry)))
        }
      })
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