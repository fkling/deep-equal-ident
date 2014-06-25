deep-equal-ident
================

Deep comparison with object identity checks.

This function performs a deep comparison between the two values `a` and `b`. It
has the same signature and functionality as [lodash's isEqual function](http://lodash.com/docs#isEqual),
with one difference: It also tracks the identity of nested objects.

---

**Installation**

    npm install deep-equal-ident
    
and use as

    var deepEqualIdent = require('deep-equal-ident');
    // ...
    var equal = deepEqualIdent(foo, bar);

---

**So, what is this really about?**

Most deep equality tests (including `_.isEqual`) consider the following
structures as equal:

```javascript
var a = [1,2,3];
var foo = [a, a];
var bar = [[1,2,3], [1,2,3]]
_.isEqual(foo , bar): // => true
```

However, it should be obvious that `foo` contains two reference to the same
object whereas `bar` contains two different (not identical) objects.

`deepEqualIdent` will consider these values as not equal:

```javascript
deepEqualIdent(foo, bar); // => false
```

The following slightly different structures would be considered equal:

```javascript
var a = [1,2,3];
var b = [1,2,3];
var foo = [a, a];
var bar = [b, b];
deepEqualIdent(foo, bar); // => true
```

---

This function should primarily be used in unit tests. A chai extension will
follow.
