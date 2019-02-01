const makefake = require('../../index');
const FakeLanguages = require('../fakesources/FakeLanguages');
const FakeParagraphs = require('../fakesources/FakeParagraphs');

it('random string generator with default params', function () {
  var fakeString = makefake({
    _type: 'string'
  });
  // default _length is 8
  expect(fakeString.length).toBe(8);
  // default _charset is 'a-z'
  expect(fakeString).toEqual(fakeString.toLowerCase());
});

it('test charset a-Z', function () {
  var fakeString = makefake({
    _type: 'string',
    _charset: 'a-Z',
    _length: 20
  });
  expect(fakeString).toMatch(/([a-z]{1})/g);
  expect(fakeString).toMatch(/([A-Z]{1})/g);
  expect(fakeString.length).toBe(20);
});

it('test charset a-z', function () {
  var fakeString = makefake({
    _type: 'string',
    _charset: 'a-z',
    _length: 40
  });
  expect(fakeString).toMatch(/([a-z]{40})/g);
  expect(fakeString.length).toBe(40);
});

it('test charset a-z', function () {
  var fakeString = makefake({
    _type: 'string',
    _charset: '0-9',
    _length: 40
  });
  expect(fakeString).toMatch(/([0-9]{40})/g);
  expect(fakeString.length).toBe(40);
});

it('test charset Symbol', function () {
  var fakeString = makefake({
    _type: 'string',
    _charset: 'Symbol',
    _length: 40
  });
  expect(fakeString).toMatch(/[^a-zA-Z0-9]{40}/g);
  expect(fakeString.length).toBe(40);
});

it('test with multi charset', function () {
  var fakeString = makefake({
    _type: 'string',
    _charset: ['Symbol', 'a-Z', [48, 57], "çşüiö"],
    _length: 40
  });

  expect(fakeString).toMatch(/([a-z]{1})/g);
  expect(fakeString).toMatch(/([çşüiö]{1})/g);
  expect(fakeString).toMatch(/([0-9]{1})/g);
  expect(fakeString).toMatch(/([A-Z]{1})/g);
  expect(fakeString).toMatch(/[^a-zA-Z0-9]{1}/g);
  expect(fakeString.length).toBe(40);
});

it('test with multi charset', function () {
  var charset = "asd";
  var fakeString = makefake({
    _type: 'string',
    _charset: charset,
    _length: 40
  });
  expect(fakeString).toMatch(/([asd]{1})/g);
  expect(fakeString.length).toBe(40);
});

it('test with _source', function () {
  var names = ["Mahmut Taşkıran", "Ali Taşkıran", "Sakine Taşkıran"];
  var fakeString = makefake({
    _type: 'string',
    _source: names
  });
  expect(fakeString).toMatch(/Mahmut Taşkıran|Ali Taşkıran|Sakine Taşkıran/g);
});

it('should return languages', function () {
  var lang = makefake({
    _type: 'string',
    _source: FakeLanguages
  });
  expect(FakeLanguages).toContain(lang);
});

it('should return paragraph', function () {
  var p = makefake({
    _type: 'string',
    _source: FakeParagraphs
  });
  expect(FakeParagraphs).toContain(p);
  console.log(p);
});