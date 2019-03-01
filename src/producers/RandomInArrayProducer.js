function randomInArrayProducer(ds, context) {
  const { _source, _count = 1 } = ds;
  if (_count === 1) {
    return _source[fr(_source.length - 1)];
  } else {
    var result = [];
    for (var i = 0; i <= _count; i++) {
      result.push(_source[fr(_source.length - 1)]);
    }
  }
}

function fr(max, min) {
  if (!min) min = 0;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

module.exports = {
  randomInArrayProducer: randomInArrayProducer
};
