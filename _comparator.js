/*jshint node:true*/
"use strict";

var toString = Object.prototype.toString;
var object_class = '[object Object]';
var array_class = '[object Array]';

function _comparator(implementation, callback, thisArg, a, b) {
  if (typeof callback !== 'undefined') {
    return  callback.call(thisArg, a, b);
  }
  var a_class = toString.call(a);
  var b_class = toString.call(b);

  if (!(a_class === object_class || a_class === array_class) ||
      !(b_class === object_class || b_class === array_class)) {
    return;
  }
  return implementation(a, b);
}

module.exports = _comparator;
