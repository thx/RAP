module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
  grunt.loadNpmTasks 'grunt-release'
  
  grunt.registerTask 'default', []
  grunt.registerTask 'test', ['default']
