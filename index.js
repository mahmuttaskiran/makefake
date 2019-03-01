const { produce, addProducer } = require("./src/Producer");
const { createContext } = require("./src/Context");
const parameterTokenizer = require("./src/ParameterTokenizer");

// import producers
const { stringProducer } = require("./src/producers/StringProducer");
const { objectProducer } = require("./src/producers/ObjectProducer");
const { arrayProducer } = require("./src/producers/ArrayProducer");
const { booleanProducer } = require("./src/producers/BooleanProducer");
const { numberProducer } = require("./src/producers/NumberProducer");
const { colorProducer } = require("./src/producers/ColorProducer");
const { randomInArrayProducer } = require("./src/producers/RandomInArrayProducer");

// add producers
addProducer("string", stringProducer);
addProducer("object", objectProducer);
addProducer("number", numberProducer);
addProducer("array", arrayProducer);
addProducer("boolean", booleanProducer);
addProducer("color", colorProducer);
addProducer("inArray", randomInArrayProducer);

// make fake data and play with it :)
function makefake(dataStructure) {
  if (Array.isArray(dataStructure) || dataStructure instanceof RegExp) {
    dataStructure = parameterTokenizer(dataStructure);
  }
  return produce(dataStructure, createContext());
}

module.exports = makefake;
