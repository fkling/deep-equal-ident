/*jshint node:true*/
module.exports = typeof global.Map === 'function' ?
  require('./deepEqualIdentMap') :
  require('./deepEqualIdentTag');
