/**
 * Created by csharon on 4/18/14.
 */
var _ = require('lodash');

module.exports = {

  getCmdLineOpts: function (taskOpts, globalTaskOpts) {
    var replaceGlobalArgs = _.isBoolean(taskOpts.replaceGlobalArgs) ? taskOpts.replaceGlobalArgs : false;
    var globalTaskArgs = _.isObject(globalTaskOpts) && _.isArray(globalTaskOpts.compilerArgs) ? globalTaskOpts.compilerArgs : [];
    var taskArgs = _.isObject(taskOpts) && _.isArray(taskOpts.compilerArgs) ? taskOpts.compilerArgs : [];
    var opts = replaceGlobalArgs ? taskArgs : globalTaskArgs.concat(taskArgs);

    return _.uniq(opts);
  }

};