const { produce, addProducer } = require("./src/Producer");
const { createContext } = require("./src/Context");

// producers
const { stringProducer } = require("./src/producers/StringProducer");
const { objectProducer } = require("./src/producers/ObjectProducer");
const { arrayProducer } = require("./src/producers/ArrayProducer");
const { booleanProducer } = require("./src/producers/BooleanProducer");
const { numberProducer } = require("./src/producers/NumberProducer");

// add producers
addProducer("string", stringProducer);
addProducer("object", objectProducer);
addProducer("number", numberProducer);
addProducer("array", arrayProducer);
addProducer("boolean", booleanProducer);

// make fake data and play with it :)
function makefake(dataStructure) {
  return produce(dataStructure, createContext());
}

module.exports = makefake;
