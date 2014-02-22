'use strict';

var pathToWeb = 'web/';
var pathToApp = 'app/';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      app: {
        expand: true,
        deleteEmptyFolders:true,
        cwd: pathToApp,
        src: [
          '**/!(*.html|templates)'
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
    includereplace: {
      dist: {
        files: [{
          src: '*.html',
          dest: pathToWeb,
          expand: true,
          cwd: pathToApp
        }]
      }
    },
    watch: {
      html: {
        options: {
          livereload: true
        },
        files: [
          pathToApp + '**/*.html'
        ],
        tasks: ['includereplace']
      },
      other: {
        options: {
          livereload: true
        },
        files: [
          pathToApp + '**/!(*.html)'
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
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'includereplace'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
