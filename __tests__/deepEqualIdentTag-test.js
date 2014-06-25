/*jshint node:true*/
/*global jest*/
"use strict";
jest.autoMockOff();

require('../runTestSuite')(
  'deepEqualIdentTag',
  require('../deepEqualIdentTag')
);
