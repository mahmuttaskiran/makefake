const makefake = require('../../index');

it('int test for deep(1) arr _index', function () {
  var fakeArray = makefake({
    _type: 'array',
    _length: 100,
    _content: {
      _type: 'number',
      _index: true
    }
  });
  var deeplyEqual = true;
  for (var i = 0; i < 100; i++){
    if (fakeArray[i] !== i) {
      deeplyEqual = false;
      break;
    }
  }
  expect(deeplyEqual).toBe(true);
});

it('int test for deep(2) arr _index', function () {
  var fakeArray = makefake({
    _type: 'array',
    _length: 100,
    _content: {
      id: {
        _type: 'number',
        _index: true
      },
      deepArray: {
        _type: 'array',
        _length: 10,
        _content: {
          _type: 'number',
          _index: true
        }
      }
    }
  });
  var deeplyEqual = true;
  for (var i = 0; i < 100; i++){
    if (fakeArray[i].id === i) {
      for (var j = 0; j < 10; j++) {
        if (fakeArray[i].deepArray[j] !== j) {
          deeplyEqual = false;
          break;
        }
      }
    } else {
      deeplyEqual = false;
      break;
    }
  }
  expect(deeplyEqual).toBe(true);
});

it('int test for range', function () {
  for (var i = 0; i < 1000; i++) {
    var fakeData = makefake({
      _type: 'number',
      _max: 100,
      _min: 25
    });
    expect(fakeData).toBeGreaterThan(24);
    expect(fakeData).toBeLessThan(100);
  }
});

it('int test for _max', function () {
  for (var i = 0; i < 1000; i++) {
    var fakeData = makefake({
      _type: 'number',
      _max: 100,
    });
    expect(fakeData).toBeGreaterThan(-1);
    expect(fakeData).toBeLessThan(100);
  }
});

it('int test for _min', function () {
  for (var i = 0; i < 1000; i++) {
    var fakeData = makefake({
      _type: 'number',
      _min: 50,
      // _max: 100 default _max is already 100.
    });
    expect(fakeData).toBeGreaterThan(49);
    expect(fakeData).toBeLessThan(100);
  }
});

it('int test for _float', function () {
  for (var i = 0; i < 1000; i++) {
    var fakeData = makefake({
      _type: 'number',
      _max: 100,
      _float: true
      // _max: 100 default _max is already 100.
    });
    expect(fakeData).toBeLessThan(100);
  }
});

