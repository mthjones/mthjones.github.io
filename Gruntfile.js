module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass: {
            options: {
                includePaths: ["_vendor/normalize-scss/", "_vendor/bourbon/app/assets/stylesheets/", "_vendor/neat/app/assets/stylesheets/", "_vendor/bitters/app/assets/stylesheets/"]
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
