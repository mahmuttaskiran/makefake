const {produce, addProducer} = require('../Producer');

it('should call right producer', function () {
  expect.assertions(2);
  addProducer('xType', function (ds, context) {
    expect(ds._type === 'xType').toBe(true);
  });
  addProducer('yType', function (ds, context) {
    expect(ds._type === 'yType').toBe(true);
  });
  produce({_type: 'xType'});
  produce({_type: 'yType'});
});

it('should return undefined', function () {
  expect(produce()).toBeUndefined();
});

it('should return null', function () {
  expect(produce(null)).toBeNull();
});

it('should return empty object', function () {
  expect(produce({})).toStrictEqual({});
});
