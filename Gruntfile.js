module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-git-authors');

  grunt.initConfig({

    authors: {
      prior: [
        "Michael Deardeuff <michael.deardeuff@gmail.com>",
        "Ward Cunningham <ward@c2.com>",
        "Nick Niemeir <nick.niemeir@gmail.com>"
      ]
    }
  });
};
