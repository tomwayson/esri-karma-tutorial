module.exports = function(grunt) {

  grunt.initConfig({
    karma: {
      // common options for all targets
      options: {
        // use Karma's defaults
        configFile: 'karma.conf.js'
      },
      // options for the build target
      build: {
        // test in real browsers once beofre build
        browsers: ['Chrome', 'Firefox'],
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma']);
};