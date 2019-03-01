const { produce } = require("../Producer");

function arrayProducer(ds, context, ref) {
  var arr;
  if (!Array.isArray(ref)) {
    arr = ref.data = [];
  } else {
    arr = ref;
  }
  var { _length, _content } = ds;
  if (typeof _length !== "number") {
    throw new Error("_length have to be a number.");
  }
  if (!_content) {
    throw new Error(
      "Define array content: _content missing in data structure."
    );
  }
  var content = context.pushContent("array");
  content.setData(arr);
  for (var i = 0; i < _length; i++) {
    content.setParam("index", i);
    if (!_content._type) {
      var objRef = { data: {} };
      arr.push(objRef.data);
      produce(_content, context, objRef);
    } else {
      arr.push(produce(_content, context));
    }
  }
  content.release();
  return arr;
}

module.exports = {
  arrayProducer: arrayProducer
};
