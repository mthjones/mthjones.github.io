module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass: {
            options: {
                includePaths: ["bower_components/normalize-scss/", "bower_components/bourbon/app/assets/stylesheets/", "bower_components/neat/app/assets/stylesheets/", "bower_components/bitters/app/assets/stylesheets/"]
            },
            dist: {
                options: {
                    outputStyle: "compressed"
                },
                files: {
                    "css/main.css": "scss/main.scss"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-sass");
    grunt.registerTask("default", ["sass"]);
};
