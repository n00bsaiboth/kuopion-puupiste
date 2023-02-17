const sass = require('node-sass');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                   sassDir: 'assets',
                   cssDir: 'css',
                   environment: 'production' 
                }
            },
            dev: {
                options: {
                    sassDir: 'assets',
                    cssDir: 'css'
                }
            }
        },

        watch: {
            sass: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        },

        sass: {
            dist: {
                options: {
                    implementation: sass,
                    compass: true,
                },
                files: {
                    'assets/css/style.css' : 'assets/scss/style.scss'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            dist: {
                src: ['assets/js/*.js'],
                dest: 'assets/js/main.min.js'
            }
        },

        uglify: {
            options: {
                manage: false,
                preserveComments: 'all'
            },
            my_target: {
                files: {
                    'assets/js/main.min.js' : ['vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js']
                }
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css/',
                    ext: '.min.css'
                }]
            }
        },

        webfont: {
            icons: {
                src: 'vendor/twbs/bootstrap-icons/icons/*.svg',
                dest: 'assets/fonts',
                destCss: 'assets/scss',
                options: {
                    stylesheet: 'scss',
                    relativeFontPath: '/assets/fonts'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // grunt.loadNpmTasks('grunt-contrib-sass');

    // grunt.loadNpmTasks('grunt-sass');

    // grunt.loadNpmTasks('node-sass');

    // grunt.loadNpmTasks('sass');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-webfont');

    grunt.registerTask('default', ['sass', 'uglify', 'cssmin', 'webfont']);
};