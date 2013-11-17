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
					paths: ["less"]
				},
				files: {
					"../css/<%= pkg.name %>.css": "less/main.less"
				}
			},
			production: {
				options: {
					paths: ["less"],
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
				src: ['src/vendor/jquery.form.js',
					'src/vendor/jquery.makeforms.js',
					'src/vendor/jquery.smooth-scroll.js',
					'src/vendor/modal.js',
					'src/vendor/nprogress.js',
					'src/vendor/prefixfree.min.js',
					'src/form-data.js',
					'src/plugins.js',
					'src/main.js'],
				dest: 'dist/<%= pkg.name %>.js'
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
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				src: ['src/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test']
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
	grunt.registerTask('debug', ['clean', 'concat', 'uglify', 'less:development']);
	grunt.registerTask('release', ['clean', 'concat', 'uglify', 'less:production']);
};
