const producers = {};

function addProducer(type, producer) {
  if (typeof producer !== "function")
    throw Error("producer is not a function.");
  if (typeof type !== "string") throw Error("type must be a string");
  producers[type] = producer;
}

function produce(dataStructure, context) {
  if (dataStructure === null) {
    return null;
  }
  if (dataStructure === undefined) {
    return undefined;
  }
  if (!dataStructure._type && Object.keys(dataStructure).length === 0) {
    return {};
  }
  // default dataStructure type is object
  var type = dataStructure._type ? dataStructure._type : "object";
  var fakeData = producers[type](dataStructure, context);
  if (dataStructure._formatter) {
    if (typeof dataStructure._formatter !== "function") {
      throw new Error("_formatter is not a function");
    }
    return dataStructure._formatter(fakeData, context.getCurrentContent());
  }
  return fakeData;
}

module.exports = {
  produce: produce,
  addProducer: addProducer
};
