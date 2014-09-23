module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass: {
            options: {
                includePaths: ["bower_components/foundation/scss"]
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
