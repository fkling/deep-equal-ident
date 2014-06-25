/*jshint node:true*/
/*global jest*/
"use strict";
jest.autoMockOff();

require('../runTestSuite')(
  'deepEqualIdentStack',
  require('../deepEqualIdentStack')
);
