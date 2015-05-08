module.exports = function(grunt) {
	var path     = 	  'myapp/www';
    var scssFile =    'myapp/www/css/index.scss';
    var cssFile  =    'myapp/www/css/index.css';

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 3rd party
        concat: {
            dist: {
                src: [
                    path+'/js/jquery/dist/jquery.min.js', 
                    path+'/js/gsap/src/minified/TweenMax.min.js',
					path+'/js/threejs/build/three.min.js',
                ],
                dest: path+'/js/index-build.js',
                nonull: true,   //geef weer als *.js bestand niet gevonden is
            }
        },
		
		uglify: {
			build: {
				src: path+'/js/index-build.js',
				dest: path+'/js/index-build.min.js'
			},
			index2: {
				src: path+'/js/index.js',
				dest: path+'/js/index.min.js'
			},
		},
		
		uglify2: {
			build: {
				src: path+'/js/index.js',
				dest: path+'/js/index.min.js'
			}
		},
        
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    // hier mag ik geen vars gebruiken ;S
                    'myapp/www/css/index.css' : 'myapp/www/css/index.scss'
                }
            }
        },
        
        watch: {
            options:{
              livereload:true,  
            },
            scripts: {
                files: [path+'/js/index.js'],
                tasks: ['uglify:index2'],
                options: {
                    spawn: false,
                },
            },           
            
            // MULTIPLE SCRIPT WATCHES POSSIBLE
            /*scripts: {
                files: [path+'/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },*/
            css: {
                files: [scssFile],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }
        
        
//		
//		imagemin: {
//			dynamic: {
//				files: [{
//					expand: true,
//					cwd: path+'/img/nav/',
//					src: ['**/*.{png,jpg,gif}'],
//					dest: 'buildImgs/'
//				}]
//			}
//		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [ 'concat', 'sass', 'uglify', 'watch']);

};