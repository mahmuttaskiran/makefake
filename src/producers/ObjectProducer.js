const { produce } = require("../Producer");

function objectProducer(ds, context) {
  var content = context.pushContent('object');
  var obj = {};
  content.setData(obj);
  var keys = Object.keys(ds);
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = produce(ds[keys[i]], context);
  }
  content.release();
  return obj;
}

module.exports = { objectProducer: objectProducer };
