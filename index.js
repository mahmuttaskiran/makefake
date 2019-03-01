const { produce, addProducer } = require("./src/Producer");
const { createContext } = require("./src/Context");

// import producers
const { stringProducer } = require("./src/producers/StringProducer");
const { objectProducer } = require("./src/producers/ObjectProducer");
const { arrayProducer } = require("./src/producers/ArrayProducer");
const { booleanProducer } = require("./src/producers/BooleanProducer");
const { numberProducer } = require("./src/producers/NumberProducer");
const { colorProducer } = require("./src/producers/ColorProducer");
const { picsumPhotoProducer } = require("./src/producers/PicsumPhotoProducer");

// add producers
addProducer("string", stringProducer);
addProducer("object", objectProducer);
addProducer("number", numberProducer);
addProducer("array", arrayProducer);
addProducer("boolean", booleanProducer);
addProducer("color", colorProducer);
addProducer("photo", picsumPhotoProducer);

// make fake data and play with it :)
function makefake(dataStructure) {
  return produce(dataStructure, createContext());
}

// producers with function
makefake.array = function (length, content) {
  return makefake({
    _type: 'array',
    _length: length,
    _content: content
  });
};

makefake.randexp = function (pattern, ignoreCase) {
  return makefake({
    _type: 'string',
    _pattern: pattern,
    _ignoreCase: ignoreCase
  });
};

makefake.string = function (length, charset) {
  if (typeof charset === 'undefined') charset = 'a-Z';
  return makefake({
    _type: 'string',
    _length: length,
    _charset: charset
  });
};

makefake.stringFromSource = function (source) {
  return makefake({
    _type: 'string',
    _source: source
  });
};

makefake.float = function (max, min) {
  if (typeof max === 'undefined') max = 100;
  if (typeof min === 'undefined') min = 0;
  return makefake({
    _type: 'number',
    _float: true,
    _max: max,
    _min: min
  });
};

makefake.number = function (max, min) {
  if (typeof max === 'undefined') max = 100;
  if (typeof min === 'undefined') min = 0;
  return makefake({
    _type: 'number',
    _max: max,
    _min: min
  });
};

makefake.photo = function (width, height) {
  if (typeof width === 'undefined') width = 400;
  if (typeof height === 'undefined') height = 400;
  return makefake({
    _type: 'photo',
    _width: width,
    _height: height
  });
};

makefake.boolean = function (truePossibilityPercent) {
  return makefake({
    _type:'boolean',
    _truePossibilityPercent: truePossibilityPercent
  });
};

// pre defined sources
makefake.nameSurname = require("./src/fakesources/FakeNames");
makefake.username = require("./src/fakesources/FakeUserNames");
makefake.word = require("./src/fakesources/FakeEnglishWords");
makefake.langueage = require("./src/fakesources/FakeLanguages");
makefake.paragraph = require("./src/fakesources/FakeParagraphs");
makefake.sentence = require("./src/fakesources/FakeSentences");

module.exports = makefake;
