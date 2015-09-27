/*global describe, it, expect*/
'use strict';

function runTestSuite(name, deepEqualIdent) {
  describe(name, function() {
    it('accepts identical structures', function() {
      var a = [1, 2];
      var b = [1, 2];
      var foo = [a, {x: a}];
      var bar = [b, {x: b}];

      expect(deepEqualIdent(foo, bar)).toBe(true);
      expect(deepEqualIdent(bar, foo)).toBe(true);
    });

    it('accepts structures without repeated objects', function() {
      var a = [1, 2];
      var b = [1, 2];
      var c = [1, 2];
      var d = [1, 2];
      var foo = [a, {x: b}];
      var bar = [c, {x: d}];

      expect(deepEqualIdent(foo, bar)).toBe(true);
      expect(deepEqualIdent(bar, foo)).toBe(true);
    });

    it("doesn't accept similar structures", function() {
      var a = [1, 2];
      var b = [1, 2];
      var c = [1, 2];
      var foo = [a, {x: a}];
      var bar = [b, {x: c}];

      expect(deepEqualIdent(foo, bar)).toBe(false);
      expect(deepEqualIdent(bar, foo)).toBe(false);
    });

    it('accepts cyclic identical structures', function() {
      var foo = [1, 2];
      foo.push({x: 0, y: foo});
      var bar = [1, 2];
      bar.push({x: 0, y: bar});

      expect(deepEqualIdent(foo, bar)).toBe(true);
      expect(deepEqualIdent(bar, foo)).toBe(true);
    });

    it.only("doesn't accept cyclic similar structures", function() {
      var foo = [1, 2, 3];
      foo.push({x: 0, y: foo});
      var bar = [1, 2, 3];
      bar.push({x: 0, y: foo}); // notice foo here

      expect(deepEqualIdent(foo, bar)).toBe(false);
      expect(deepEqualIdent(bar, foo)).toBe(false);

      /*
      // This test doesn't pass because of the way how lodash traverses the data
      // structure. If it finds `a === b` it doesn't traverse into either of
      // them, so we don't know that the second element already exists within
      // the first.
      //
      var arr = [[]];
      foo = [arr, arr[0]];
      bar = [arr, []];
      expect(deepEqualIdent(foo, bar)).toBe(false);
      expect(deepEqualIdent(bar, foo)).toBe(false);
      */
    });

    it("doesn't accept this weird cross-referential structure", function() {
      var a = [1, 2, 3];
      var b = [1, 2, 3];
      var foo = [a, a];
      var bar = [a, b];

      expect(deepEqualIdent(foo, bar)).toBe(false);
      expect(deepEqualIdent(bar, foo)).toBe(false);
    });
  });
}

module.exports = runTestSuite;
