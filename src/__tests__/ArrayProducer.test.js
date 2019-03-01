const makefake = require("../../index");

it("should access array content from last pushed item", function() {
  makefake({
    _type: "array",
    _length: 10,
    _content: {
      index: {
        _type: "number",
        _formatter: function() {
          return this.length - 1;
        }
      },
      data: {
        _type: "string",
        _charset: ["A-Z"],
        _length: 10,
        _formatter: function(data) {
          /*
            Content is object represents object in array and parent is
            current array. Every array has 'index' param represents current
            index.
          */
          var i = this.length - 1;
          expect(i).toBe(this[i].index);
          return data;
        }
      }
    }
  });
});

it(
  "should generate array length is 100 and" + " contain index numbers",
  function() {
    var fakeArr = makefake({
      _type: "array",
      _length: 100,
      _content: {
        index: {
          _type: "number",
          _index: true
        },
        data: {
          _type: "string",
          _charset: ["A-Z", " "],
          _length: 10
        }
      }
    });
    var deepEqual = true;
    for (var i = 0; i < 100; i++) {
      if (fakeArr[i].index !== i) {
        deepEqual = false;
        break;
      }
    }
    expect(deepEqual).toBe(true);
  }
);

it("should throw _length missing", function() {
  expect(function() {
    makefake({
      _type: "array"
    });
  }).toThrow();
});

it("should throw _content missing", function() {
  expect(function() {
    makefake({
      _type: "array",
      _length: 10
    });
  }).toThrow();
});

it("should throw _length have to be a number", function() {
  expect(function() {
    makefake({
      _type: "array",
      _length: "10",
      _content: {
        _type: "number"
      }
    });
  }).toThrow();
});
