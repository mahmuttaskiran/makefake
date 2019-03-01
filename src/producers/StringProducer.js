"use strict";
const RandExp = require('randexp');
const Charsets = {};

Charsets["0-9"] = [48, 57];
Charsets["A-Z"] = [65, 90];
Charsets["a-z"] = [97, 122];
Charsets["a-Z"] = [97, 122, 65, 90];
Charsets["Symbol"] = [33, 47, 58, 64, 91, 96];

function stringProducer(ds, context) {
  const { _source, _pattern, _ignoreCase } = ds;
  // if _source is not defined, produce random string
  var fakeString;
  if (_pattern) {
    var randomExp = new RandExp(_pattern, _ignoreCase);
    fakeString = randomExp.gen();
  } else if (_source) {
    fakeString = _source[fr(_source.length -1)];
  } else {
    fakeString = randomStringProducer(ds, context);
  }
  return fakeString;
}

function randomStringProducer(ds, context) {
  var { _length, _charset } = ds;
  // default length is 8
  if (!_length) _length = 8;
  var str = "";
  // produce random str for defined charset
  if (!_charset) {
    _charset = "a-z";
  }
  if (typeof _charset === "string") {
    if (
      _charset === "a-z" ||
      _charset === "A-Z" ||
      _charset === "a-Z" ||
      _charset === "0-9" ||
      _charset === "Symbol"
    ) {
      _charset = Charsets[_charset];
    }
  }
  if (Array.isArray(_charset)) {
    // check is single array just like [0, 100, 122, 140]
    var singleArray = true;
    for (var i = 0; i < _charset.length; i++) {
      if (typeof _charset[i] !== "number") {
        singleArray = false;
        break;
      }
    }
    // if charset is just like that ["adasd123", [1, 100], 'a-Z']
    if (!singleArray) {
      while (str.length < _length) {
        str += randomStringProducer({
          _length: 1,
          _charset: _charset[fr(_charset.length - 1)]
        });
      }
      return str;
    }
  }
  if (typeof _charset === "string") {
    while (str.length < _length) {
      str += _charset[fr(_charset.length -1)];
    }
  } else if (Array.isArray(_charset)) {
    if (_charset.length < 1) {
      throw new Error("_charset is empty: " + JSON.stringify(ds));
    }
    if (typeof _charset[0] === "number") {
      if (_charset.length % 2 !== 0) {
        throw new Error(
          "_charset must be range of char codes." +
            " For example for AZ = [65, 90]. See ASCII Table. " +
            JSON.stringify(ds)
        );
      }
      while (str.length < _length) {
        var rc = fr(_charset.length - 1);
        if (rc % 2 !== 0) {
          rc--;
        }

        if (
          typeof _charset[rc] !== "number" ||
          typeof _charset[rc + 1] !== "number"
        ) {
          throw new Error("Unsupported charset: " + JSON.stringify(_charset));
        }

        str += String.fromCharCode(
          fr(
            Math.max(_charset[rc], _charset[rc + 1]),
            Math.min(_charset[rc], _charset[rc + 1])
          )
        );
      }
    } else {
      throw new Error("Unsupported charset: " + JSON.stringify(_charset));
    }
  }
  return str;
}

function fr(max, min) {
  if (!min) min = 0;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

module.exports = {
  stringProducer: stringProducer
};
