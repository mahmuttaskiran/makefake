const producers = {};

function addProducer(type, producer) {
  if (typeof producer !== "function")
    throw Error("producer is not a function.");
  if (typeof type !== "string") throw Error("type must be a string");
  producers[type] = producer;
}

function produce(ds, context, objRef) {
  if (ds === null) {
    return null;
  }
  if (ds === undefined) {
    return undefined;
  }
  if (!ds._type && Object.keys(ds).length === 0) {
    return {};
  }
  // default dataStructure type is object
  var type = ds._type ? ds._type : "object";
  var ref = {data: null};
  var produced = producers[type](ds, context, objRef || ref);
  if (ref.data === null) ref.data = produced;
  if (ds._formatter) {
    if (typeof ds._formatter !== "function") {
      throw new Error("_formatter is not a function");
    }
    var rootContent =context.getRootContent();
    if (rootContent.isObject() || rootContent.isArray()) {
      ds._formatter = ds._formatter.bind(
        context.getRootContent().getData()
      );
    }
    return ds._formatter(ref.data);
  }
  return ref.data;
}

module.exports = {
  produce: produce,
  addProducer: addProducer
};
