'use strict';

var pathToWeb = 'web/';
var pathToApp = 'app/';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      app: {
        expand: true,
        cwd: pathToApp,
        src: [
          '**/*'
        ],
        dest: pathToWeb
      },
      libs: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'backbone/backbone.js',
          'underscore/underscore-min.js',
          'underscore/underscore-min.map',
          'jquery/jquery.min.js'
        ],
        dest: pathToWeb + 'libs/'
      }
    },
    clean: [pathToWeb],
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      all: {
        options: {
          livereload: true
        },
        files: [
          pathToApp + '**/*'
        ],
        tasks: ['copy']
      },
      express: {
        files: [
          'server.js',
          'config/**/*.{js,json}',
          'src/**/*.js'
        ],
        tasks: [
          'express:dev'
        ],
        options: {
          livereload: true,
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
