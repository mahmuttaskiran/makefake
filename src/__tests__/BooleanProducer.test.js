const makefake = require('../../index');

it('should return true', function () {
   var fakeBoolean = makefake({
     _type: 'boolean',
     _truePossibilityPercent: 100
  });
   expect(fakeBoolean).toBe(true);
});

it('should return false', function () {
  var fakeBoolean = makefake({
    _type: 'boolean',
    _truePossibilityPercent: 0
  });
  expect(fakeBoolean).toBe(true);
});

