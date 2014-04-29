module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    rsync: {
      options: {
          args: ["--verbose"],
          exclude: [".git*","*.scss","node_modules"],
          recursive: true
      },
      dist: {
          options: {
              src: "./src",
              dest: "./dist"
          }
      },
      stage: {
          options: {
              src: "../dist/",
              dest: "/var/www/site",
              host: "user@staging-host",
              syncDestIgnoreExcl: true
          }
      },
      prod: {
          options: {
              src: "../dist/",
              dest: "/var/www/site",
              host: "user@live-host",
              syncDestIgnoreExcl: true
          }
      }
  }
    uglify: {
      js: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/js/iq.min.map',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'dist/js/iq.min.js': 
          [
            'src/js/vendor/fastclick.js',
            'src/js/vendor/jquery.placeholder.js',
            'src/js/vendor/jquery.cookie.js',
            'src/js/iq/iq.js',
            'src/js/coremetrics/cmdatatagutils.js',
            'src/js/coremetrics/eluminate.js',
            'src/js/iq/iq.utils.js',
            'src/js/iq/iq.animation.js',
            'src/js/iq/iq.cm.js',
            'src/js/iq/iq.social.js',
            'src/js/iq/iq.bcom.js'
          ]
        ,'dist/js/modernizr.js': ['src/js/vendor/modernizr.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('develop', ['build', 'rsync:dist']);
  grunt.registerTask('deploy', ['build', 'rsync:dist']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['build']);
}