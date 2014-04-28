module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['build']);
}