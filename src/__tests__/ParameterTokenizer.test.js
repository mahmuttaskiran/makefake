const makefake = require("../../index");
const parameterTokenizer = require("../ParameterTokenizer");
const to = function(v) {
  const r = parameterTokenizer(v);
  console.warn(v, "-->", r);
  return r;
};
it("should get color", function() {
  expect(to(["color"])).toEqual({
    _type: "color"
  });
});

it("should get inArray", function() {
  expect(to([2, [1, 2, 3]])).toEqual({
    _type: "inArray",
    _count: 2,
    _source: [1, 2, 3]
  });
  expect(to([[1, 2, 3]])).toEqual({
    _type: "inArray",
    _count: 1,
    _source: [1, 2, 3]
  });
});

it("should get array", function() {
  expect(to([[/test/], 2])).toEqual({
    _type: "array",
    _length: 2,
    _content: {
      _type: "string",
      _pattern: /test/
    }
  });
  expect(to([[50, 100], 2])).toEqual({
    _type: "array",
    _length: 2,
    _content: {
      _type: "number",
      _min: 50,
      _max: 100
    }
  });
  expect(to([[10, [1, 2, 3, 5]], 2])).toEqual({
    _type: "array",
    _length: 2,
    _content: {
      _type: "inArray",
      _count: 10,
      _source: [1, 2, 3, 5]
    }
  });
  expect(
    to([
      {
        test: [0, 100]
      },
      20
    ])
  ).toEqual({
    _type: "array",
    _length: 20,
    _content: {
      test: [0, 100]
    }
  });
  expect(to([[true, 10], 10])).toEqual({
    _type: "array",
    _length: 10,
    _content: {
      _type: "boolean",
      _truePossibilityPercent: 10
    }
  });
});

it("should get boolean", function() {
  expect(to([true])).toEqual({
    _type: "boolean",
    _truePossibilityPercent: 50
  });
  expect(to([false, 10])).toEqual({
    _type: "boolean",
    _truePossibilityPercent: 90
  });
});

it("should get formatter", function() {
  expect(to([function() {}])).toEqual(
    expect.objectContaining({
      _type: "formatter"
    })
  );
});

it("should string", function() {
  expect(to(/test/)).toEqual({
    _type: "string",
    _pattern: /test/
  });
  expect(to([/test/])).toEqual({
    _type: "string",
    _pattern: /test/
  });
});
