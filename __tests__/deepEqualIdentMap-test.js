/*jshint node:true*/
/*global jest*/
"use strict";
jest.autoMockOff();

if (typeof global.Map === 'function') {
  require('../runTestSuite')(
    'deepEqualIdentMap',
    require('../deepEqualIdentMap')
  );
}
