function formatterProducer(ds, context) {
  const { _func } = ds;
  if (typeof _func !== "function") {
    throw new Error('_func must be a function');
  }
  return _func();
}

module.exports = {
  formatterProducer: formatterProducer
};
