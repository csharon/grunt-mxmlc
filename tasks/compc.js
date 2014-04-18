/*
 * grunt-mxmlc
 * https://github.com/JamesMGreene/grunt-mxmlc
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process'),
  flexSdk = require('flex-sdk'),
  async = require('async'),
  _ = require('lodash'),
  utils = require('./lib/utils');


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('compc', 'A Grunt task plugin to compile Adobe SWCs with the `compc` compiler from the Apache/Adobe Flex SDK.', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      //var defaults = mxmlcOptions.getDefaults();
      var taskOpts = this.options();
      var globalTaskOpts = grunt.config.get('compc.options');

      var done = this.async();

      var workerFn = function(f, callback) {

        var cmdLineOpts = utils.getCmdLineOpts(taskOpts, globalTaskOpts);

        grunt.verbose.writeln('compc path: ' + flexSdk.bin.compc);
        grunt.verbose.writeln('options: ' + cmdLineOpts);

        // Compile!
        childProcess.execFile(flexSdk.bin.compc, cmdLineOpts, function(err, stdout, stderr) {


          // TODO: Probably want to do something more here...? Not positive yet.
          if (!err) {
            grunt.log.writeln('File "' + f.dest + '" created.');
          } else {
            grunt.log.error(err.toString());
            grunt.verbose.writeln('stdout: ' + stdout);
            grunt.verbose.writeln('stderr: ' + stderr);

            if (options.force === true) {
              grunt.log.warn('Should have failed but will continue because this task had the `force` option set to `true`.');
            } else {
              grunt.fail.warn('FAILED');
            }

          }
          callback(err);
        });



      };

    var maxConcurrency = 1;
    var q = async.queue(workerFn, maxConcurrency); q.drain = done;

    // Iterate over all specified file groups.
    q.push(this.files);
  });
};