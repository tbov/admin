module.exports = function(grunt) { 

	grunt.initConfig({ 
		pkg: grunt.file.readJSON('package.json'),
		  jshint: {
   			 files: {
   			 	src:['Gruntfile.js', 'app/src/**/*.js', 'app/components/**/*.js']
  			  }
  			},
		sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        'app/css/main.css': 'app/css/sass/main.scss'      // 'destination': 'source'
		      }
		    }
		  },
		  watch: {
			  scss: {
			    options: {
			      interrupt: true
			      // livereload: true
			    },
			    files: 'app/css/sass/*.scss',
			    tasks: ['sass']
			  },
			  livereload: {
			  	options: {livereload: true},
			  	files: ['app/css/*.css', 
			  	'app/src/admin/Add/*.html',
			  	'app/src/admin/Add/*.js',
			  	'app/src/admin/Dashboard/*.html',
			  	'app/src/admin/Dashboard/*.js',
			  	'app/src/admin/Login/*.html',
			  	'app/src/admin/Login/*.js',
			  	'app/src/brand/Add/*.html',
			  	'app/src/brand/Add/*.js',
			  	'app/src/brand/Edit/*.html',
			  	'app/src/brand/Edit/*.js',
			  	'app/src/voucher/Add/*.html',
			  	'app/src/voucher/Add/*.js',
			  	'app/src/voucher/Edit/*.html',
			  	'app/src/voucher/Edit/*.js',
			  	'app/src/voucher/Delete/*.html',
			  	'app/src/voucher/Delete/*.js'
			  	]
			  }
			}
		// 	,
		// ngAnnotate: {
		// 	  options: {
		// 	  		singleQuotes: true
		// 	  },
		// 	  app: {
		// 	  	files : { 'app/min-safe/css/*.css' :['app/css/*.css'], 
		// 	  	'app/src/admin/Add/*.html' :['app/src/admin/Add/*.html'],
		// 	  	'app/src/admin/Add/*.js',
		// 	  	'app/src/admin/Dashboard/*.html',
		// 	  	'app/src/admin/Dashboard/*.js',
		// 	  	'app/src/admin/Login/*.html',
		// 	  	'app/src/admin/Login/*.js',
		// 	  	'app/src/brand/Add/*.html',
		// 	  	'app/src/brand/Add/*.js',
		// 	  	'app/src/brand/Edit/*.html',
		// 	  	'app/src/brand/Edit/*.js',
		// 	  	'app/src/voucher/Add/*.html',
		// 	  	'app/src/voucher/Add/*.js',
		// 	  	'app/src/voucher/Edit/*.html',
		// 	  	'app/src/voucher/Edit/*.js',
		// 	  	'app/src/voucher/Delete/*.html',
		// 	  	'app/src/voucher/Delete/*.js'

		// 	  	}
		// 	  }
		// } 
	});


	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');

	grunt.registerTask('default', ['sass', 'ngAnnotate', 'concat', 'uglify']);

};