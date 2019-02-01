const { produce } = require("../Producer");

function arrayProducer(ds, context) {
  var { _length, _content } = ds;

  if (!_length) {
    throw new Error(
      "Define array length: _length missing in data structure."
    );
  }

  if (typeof _length !== 'number') {
    throw new Error("_length have to be a number.");
  }

  if (!_content) {
    throw new Error(
      "Define array content: _content missing in data structure."
    );
  }

  var arr = [];
  var content = context.pushContent('array');
  content.setData(arr);

  for (var i = 0; i < _length; i++) {
    content.setParam("index", i);
    arr.push(produce(_content, context));
  }

  content.release();
  return arr;
}

module.exports = {
  arrayProducer: arrayProducer
};