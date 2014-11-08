module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
	      options: {
	        stripBanners: true,
	        banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
	          ' * <%= pkg.homepage %>\n' +
	          ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
	          ' * Licensed GPLv2+' +
	          ' */\n'
	      },
	      'venture-4th': {
	        src: [
	          'assets/js/src/venture4th-script.js'
	        ],
	        dest: 'assets/js/debug/venture_debug.js'
	      }
	    },
		jshint: {
	      all: [
	        'Gruntfile.js',
	        'assets/js/src/**/*.js'
	      ],
	      options: {
	        curly:   true,
	        eqeqeq:  true,
	        immed:   true,
	        latedef: true,
	        newcap:  true,
	        noarg:   true,
	        sub:     true,
	        undef:   true,
	        boss:    true,
	        eqnull:  true,
	        globals: {
	          "window": false,
	          exports: true,
	          module:  false,
	          "console": false,
	          "document": false,
	          "$": false,
	          "jQuery": false,
	          "_": false,
	          "ga": false,
	          "_gaq": false,
	          "navigator": false
	        }
	      }
	    },
    	uglify: {
	      all: {
	        files: {
	          'assets/js/min/venture4th-script.js': ['assets/js/debug/venture_debug.js']
	        },
	        options: {
	          banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
	            ' * <%= pkg.homepage %>\n' +
	            ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
	            ' * Licensed GPLv2+' +
	            ' */\n',
	          mangle: {
	            except: ['jQuery']
	          }
	        }
	      }
	    },
	    sass: {
		  dist: {
		    options: {
		      sourcemap: false
		    },
		    files: {
		      'assets/css/style.css': 'assets/css/sass/style.scss'
		    }
		  }
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			            ' * <%= pkg.homepage %>\n' +
			            ' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
			            ' * Licensed GPLv2+' +
			            ' */\n'
	     },
	    minify : {
	        expand: true,

	        cwd: 'assets/css/',
	        src: ['venture4th-styles.css'],

	        dest: 'assets/css/',
	        ext : '.min.css'
	      }
	    },
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		}
	});

	// Load other tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin'] );

};