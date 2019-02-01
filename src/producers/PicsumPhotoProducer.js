function picsumPhotoProducer(ds, context) {
  var { _width = 400, _height = 400, _key } = ds;
  if (!_key) {
    var lastArrayContent = context.getLastContentWithType("array");
    if (lastArrayContent) {
      _key = lastArrayContent.getParam("index");
    } else {
      _key = Math.random();
    }
  }
  return (
    "https://picsum.photos/" +
    _width +
    "/" +
    _height +
    "/?key=" +
    _key +
    "&random"
  );
}

module.exports = { picsumPhotoProducer: picsumPhotoProducer };
