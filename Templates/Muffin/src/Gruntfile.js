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
					paths: ["less", "less/vendor", "less/bootstrap"]
				},
				files: {
					"../css/<%= pkg.name %>.css": "less/main.less"
				}
			},
			production: {
				options: {
					paths: ["less", "less/vendor", "less/bootstrap"],
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
					'js/vendor/*.js',
					'js/bootstrap/transition.js',
					'js/bootstrap/alert.js',
					'js/bootstrap/button.js',
					'js/bootstrap/carousel.js',
					'js/bootstrap/collapse.js',
					'js/bootstrap/dropdown.js',
					'js/bootstrap/modal.js',
					'js/bootstrap/tooltip.js',
					'js/bootstrap/popover.js',
					'js/bootstrap/scrollspy.js',
					'js/bootstrap/tab.js',
					'js/bootstrap/affix.js',
					'js/*.js'],
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
				src: ['Gruntfile.js', 'src/**/*.js', 'src/js/*.js',
					'less/**/*.less', 'less/bootstrap/*.less']
			}
		},
		watch: {
			src: {
				files: ['Gruntfile.js','js/vendor/*.js',
					'js/bootstrap/transition.js',
					'js/bootstrap/alert.js',
					'js/bootstrap/button.js',
					'js/bootstrap/carousel.js',
					'js/bootstrap/collapse.js',
					'js/bootstrap/dropdown.js',
					'js/bootstrap/modal.js',
					'js/bootstrap/tooltip.js',
					'js/bootstrap/popover.js',
					'js/bootstrap/scrollspy.js',
					'js/bootstrap/tab.js',
					'js/bootstrap/affix.js',
					'js/*.js', 'less/**/*.less', 'less/bootstrap/*.less'],
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
