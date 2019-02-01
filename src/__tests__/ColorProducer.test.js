const makefake = require('../../index');

it('should return true', function () {
  var fakeColor = makefake({
    _type: 'color'
  });

  console.log(fakeColor);
});