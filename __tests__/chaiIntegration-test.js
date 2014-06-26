/*jshint node:true*/
/*global jest, describe, it, expect, beforeEach*/
"use strict";

jest.autoMockOff();
jest.mock('../deepEqualIdentStack');

var deepEqualIdentStack = require('../deepEqualIdentStack');
var chai = require('chai');
chai.use(require('../chai'));

describe('chai.js integeration', function() {

  beforeEach(function() {
    deepEqualIdentStack.mockClear();
  });

  describe('expect() interface', function() {

    it('performs identically deep equal checks if identically keyword is present', function() {
      deepEqualIdentStack
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      expect(function() {
        chai.expect([1,2,3]).to.deep.identically.equal([1,2,3]);
      }).not.toThrow();

      expect(function() {
        chai.expect([1,2,3]).to.identically.eql([]);
      }).toThrow();

      expect(function() {
        chai.expect([1,2,3]).to.identically.eqls([]);
      }).toThrow();

      expect(deepEqualIdentStack.mock.calls.length).toBe(3);
    });

    it('does not call deepEqualIdent if deep is not set', function() {
      deepEqualIdentStack
        .mockReturnValue(true);

      expect(function() {
        chai.expect([1,2,3]).to.identically.equal([1,2,3]);
      }).toThrow();

      expect(deepEqualIdentStack.mock.calls.length).toBe(0);
    });

    it('does not call deepEqualIdent if identically is not set', function() {
      deepEqualIdentStack
        .mockReturnValue(true);

      expect(function() {
        chai.expect([1,2,3]).to.equal([1,2,3]);
      }).toThrow();

      expect(function() {
        chai.expect([1,2,3]).to.deep.equal([1,2,3]);
      }).not.toThrow();

      expect(deepEqualIdentStack.mock.calls.length).toBe(0);
    });

  });

  describe('assert interface', function() {

    it('calls deepEqualIdent when assert.deepEqualIdent is called', function() {
      deepEqualIdentStack
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      expect(function() {
        chai.assert.deepEqualIdent([1,2,3], [1,2,3]);
      }).not.toThrow();

      expect(function() {
        chai.assert.deepEqualIdent([1,2,3], []);
      }).toThrow();

      expect(deepEqualIdentStack.mock.calls.length).toBe(2);
    });

    it('calls deepEqualIdent when assert.notDeepEqualIdent is called', function() {
      deepEqualIdentStack
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      expect(function() {
        chai.assert.notDeepEqualIdent([1,2,3], [1,2,3]);
      }).toThrow();

      expect(function() {
        chai.assert.notDeepEqualIdent([1,2,3], []);
      }).not.toThrow();

      expect(deepEqualIdentStack.mock.calls.length).toBe(2);
    });

  });
});
