const DEFAULT_MAX_NUMBER = 100; // for percent

function numberProducer(ds, context) {
  var { _index, _max = DEFAULT_MAX_NUMBER, _min = 0, _float = false } = ds;
  if (_min > _max || _min === _max) {
    throw new Error(
      "_min cannot be greater than (or equal to) _max. " +
      "Dont forget, default _max is 100 and _min is 0."
    );
  }
  if (_index === true) {
    // TODO add deep array index to fetch index from array
    var lastArrayContent = context.getLastContentWithType("array");
    if (lastArrayContent === null) {
      throw new Error("_index only can be produced in array");
    }
    return lastArrayContent.getParam("index");
  }
  const rn = Math.random() * (_max - _min) + _min;
  return _float ? rn : Math.floor(rn);
}

module.exports = { numberProducer: numberProducer };
