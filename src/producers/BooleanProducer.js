function booleanProducer(ds, context) {
  var { _truePossibilityPercent = 50 } = ds;
  var randomPercent = Math.floor(Math.random() * 100);
  return randomPercent <= _truePossibilityPercent;
}

module.exports = { booleanProducer: booleanProducer };
