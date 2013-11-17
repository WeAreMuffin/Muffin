'use strict';

module.exports = function(grunt) {
	// Show elapsed time at the end
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: grunt.file.read('muffin.banner'),
		// Task configuration.
		clean: {
			files: ['dist']
		},
		less: {
			development: {
				options: {
					paths: ["less","less/vendor"]
				},
				files: {
					"../css/<%= pkg.name %>.css": "less/main.less"
				}
			},
			production: {
				options: {
					paths: ["less","less/vendor"],
					cleancss: true
				},
				files: {
					"../css/<%= pkg.name %>.min.css": "less/main.less"
				}
			}
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: [
					'src/vendor/jquery.smooth-scroll.js',
					'src/vendor/jquery.makeforms.min.js',
					'src/vendor/jquery.form.min.js',
					'src/vendor/modal.js',
					'src/vendor/nprogress.js',
					'src/vendor/prefixfree.min.js',
					'src/form-data.js',
					'src/plugins.js',
					'src/main.js'],
				dest: '../js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '../js/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			src: {
				src: ['src/**/*.js', 'less/**/*.less']
			}
		},
		watch: {
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['dev:src']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);
	grunt.registerTask('server', ['watch']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('dev', ['clean', 'concat', 'uglify', 'less:development']);
	grunt.registerTask('prod', ['clean', 'concat', 'uglify', 'less:production']);
};
