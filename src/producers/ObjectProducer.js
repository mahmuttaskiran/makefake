const { produce } = require("../Producer");

function objectProducer(ds, context, objRef) {
  // push object content
  var content = context.pushContent("object");
  // result object
  var obj;
  if (!objRef.data) obj = objRef.data = {};
  else obj = objRef.data;
  // give a obj reference to content
  content.setData(obj);
  var keys = Object.keys(ds);
  for (var i = 0; i < keys.length; i++) {
    var value = ds[keys[i]];
    if (!value._type) {
      // default value
      obj[keys[i]] = value;
    } else {
      // produce
      if (value._type === "array") {
        obj[keys[i]] = [];
        produce(value, context, obj[keys[i]]);
      } else {
        obj[keys[i]] = produce(value, context);
      }
    }
  }
  // release content
  content.release();
  return obj;
}

module.exports = { objectProducer: objectProducer };
