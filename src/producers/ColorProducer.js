const randomColor = require('randomcolor');

function colorProducer(ds, context) {
  var { _hue, _luminosity, _format, _alpha} = ds;
  return randomColor({
    hue: _hue,
    luminosity: _luminosity,
    format: _format,
    alpha: _alpha
  });
}

module.exports = { colorProducer: colorProducer };
