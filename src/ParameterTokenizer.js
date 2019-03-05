const ARR = 0;
const REGEX = 1;
const BOOL = 2;
const OBJ = 3;
const COLOR = 4;
const PICSUM = 5;
const FUNC = 6;
const NUM = 7;
const STR = 8;

var colorFormats = [
  "rgb",
  "rgba",
  "rgbArray",
  "hsl",
  "hsla",
  "hslArray",
  "hex"
];
var colorLuminosities = ["bright", "light", "dark"];

function colorFormatPicker(tokens, values) {
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i] === STR) {
      if (colorFormats.includes(values[i])) {
        return values[i];
      }
    }
  }
}

function colorLuminosityParamPicker(tokens, values) {
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i] === STR) {
      if (colorLuminosities.includes(values[i])) {
        return values[i];
      }
    }
  }
}

function colorHueParamPicker(tokens, values) {
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i] === STR) {
      if (
        !colorFormats.includes(values[i]) &&
        !colorLuminosities.includes(values[i])
      ) {
        return values[i];
      }
    }
  }
}

const truePossibilityPercentCalculator = function(tokens, values) {
  // if first value is true, _truePossibilityPercent is given value
  // for example, if input is that "[true, 20]" then _truePossibilityPercent is 20
  // but if first value is "false", for example input is like that "[false, 20]",
  // in this case _truePossibilityPercent will be 80.
  if (values[0] === true && tokens[1] === NUM) {
    return values[1];
  } else if (values[0] === false && tokens[1] === NUM) {
    return 100 - values[1];
  }
};

const isFloat = function(tokens, values) {
  const _isFloat = function(n) {
    if (typeof n !== "number") return false;
    return n === +n && n !== (n | 0);
  };
  return _isFloat(values[0]) || _isFloat(values[1]);
};

const getMinimumValue = function(tokens, values) {
  if (tokens[1] === NUM) {
    return values[0];
  }
  if (isFloat(tokens, values)) {
    return 0.0;
  } else {
    return 0;
  }
};

const getMaximumValue = function(tokens, values) {
  if (tokens[1] === NUM) {
    return values[1];
  }
  if (isFloat(tokens, values)) {
    return values[0].toFixed(2);
  } else {
    return values[0];
  }
};

const getArrayContent = function(tokens, values) {
  const content = values[0];
  if (Array.isArray(content)) {
    return parameterTokenizer(content);
  } else {
    return content;
  }
};

const booleanStructure = [
  {
    required: true,
    params: [BOOL],
    result: {
      _type: "boolean",
      _truePossibilityPercent: 50
    }
  },
  {
    required: false,
    params: [FUNC, NUM],
    result: {
      _type: "boolean",
      _truePossibilityPercent: truePossibilityPercentCalculator,
      _formatter: [FUNC]
    }
  },
  {
    required: false,
    params: [FUNC, NUM],
    result: {
      _type: "boolean",
      _truePossibilityPercent: truePossibilityPercentCalculator,
      _formatter: [FUNC]
    },
    notEqual: {
      with: 1,
      what: ["token"]
    }
  }
];

const numberStructure = [
  {
    required: true,
    params: [NUM],
    result: {
      _type: "number",
      _min: getMinimumValue,
      _max: [NUM],
      _float: isFloat
    }
  },
  {
    required: false,
    params: [NUM, FUNC],
    result: {
      _type: "number",
      _min: getMinimumValue,
      _max: getMaximumValue,
      _float: isFloat,
      _formatter: [FUNC]
    },
    notEqual: {
      with: 0,
      what: ["value"]
    }
  },
  {
    required: false,
    params: [FUNC],
    result: {
      _type: "number",
      _min: getMinimumValue,
      _max: getMaximumValue,
      _float: isFloat,
      _formatter: [FUNC]
    },
    notEqual: {
      with: 1,
      what: ["value"]
    }
  }
];

const inArrayStructureParam = {
  required: false,
  params: [FUNC, ARR],
  result: {
    _type: "inArray",
    _source: function(tokens, values) {
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] === ARR) {
          return values[i];
        }
      }
    },
    _count: function(tokens, values) {
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i] === NUM) {
          return values[i];
        }
      }
    },
    _formatter: [FUNC]
  }
};

const inArrayStructure = [
  {
    required: true,
    params: [ARR, NUM],
    result: {
      _type: "inArray",
      _source: [ARR],
      _count: function(tokens) {
        if (tokens[0] === ARR) {
          return 1;
        }
      }
    }
  },
  inArrayStructureParam,
  inArrayStructureParam
];

const arrayStructure = [
  {
    required: true,
    params: [ARR, OBJ]
  },
  {
    required: true,
    params: [NUM],
    result: {
      _type: "array",
      _length: [NUM],
      _content: getArrayContent
    }
  },
  {
    required: false,
    params: [FUNC],
    result: {
      _type: "array",
      _length: function(tokens, values) {
        return values[1];
      },
      _content: getArrayContent,
      _formatter: [FUNC]
    }
  }
];

const stringStructure = [
  {
    required: true,
    params: [REGEX],
    result: {
      _type: "string",
      _pattern: [REGEX]
    }
  },
  {
    required: false,
    params: [FUNC],
    result: {
      _type: "string",
      _pattern: function() {
        return values[0];
      },
      _formatter: [FUNC]
    }
  }
];

const formatterStructure = [
  {
    required: true,
    params: [FUNC],
    result: {
      _type: "formatter",
      _formatter: [FUNC]
    }
  }
];

const colorStructureParam = {
  required: false,
  params: [FUNC, STR, NUM],
  result: {
    _type: "color",
    _formatter: [FUNC],
    _alpha: [NUM],
    _hue: colorHueParamPicker,
    _luminosity: colorLuminosityParamPicker,
    _format: colorFormatPicker
  }
};
const colorStructure = [
  {
    required: true,
    params: [COLOR],
    result: {
      _type: "color"
    }
  },
  colorStructureParam,
  colorStructureParam,
  colorStructureParam,
  colorStructureParam,
  colorStructureParam
];

const structures = [
  booleanStructure,
  numberStructure,
  inArrayStructure,
  arrayStructure,
  stringStructure,
  formatterStructure,
  colorStructure
];

const getToken = function(value) {
  if (value instanceof RegExp) {
    return REGEX;
  } else if (Array.isArray(value)) {
    return ARR;
  } else if (typeof value === "object") {
    return OBJ;
  } else if (value === "picsum") {
    return PICSUM;
  } else if (value === "color") {
    return COLOR;
  } else if (typeof value === "number") {
    return NUM;
  } else if (typeof value === "boolean") {
    return BOOL;
  } else if (typeof value === "function") {
    return FUNC;
  } else if (typeof value === "string") {
    return STR;
  }
  return null;
};

const isMatched = function(tokens, values, structure) {
  var lastMatchedStructure = false;
  var matchedTokenLength = 0;
  for (var i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const struct = structure[i];
    const matched = struct.params.includes(token);
    const isRequired = struct.required;
    if (!matched && isRequired) return false;
    const notEqual = struct.notEqual;
    if (notEqual) {
      const index = notEqual.with;
      if (notEqual.what.includes("token")) {
        if (token === tokens[index]) {
          return false;
        }
      }
      if (notEqual.what.includes("value")) {
        if (values[i] === values[index]) {
          return false;
        }
      }
    }
    if (matched) {
      matchedTokenLength++;
    }
    lastMatchedStructure = struct;
  }
  if (matchedTokenLength === tokens.length) {
    return lastMatchedStructure;
  }
  return false;
};

const toStructure = function(tokens, values, struct) {
  if (!struct || !struct.result) return;
  const result = {};
  const _struct = struct.result;
  const _keys = Object.keys(_struct);
  for (var i = 0; i < _keys.length; i++) {
    const content = _struct[_keys[i]];
    if (Array.isArray(content)) {
      const tokenIndex = tokens.indexOf(content[0]);
      if (tokenIndex !== -1) {
        result[_keys[i]] = values[tokenIndex];
      }
    } else if (typeof content === "function") {
      const funcResult = content(tokens, values);
      if (funcResult) {
        result[_keys[i]] = funcResult;
      }
    } else {
      result[_keys[i]] = _struct[_keys[i]];
    }
  }
  return result;
};

const parameterTokenizer = function(values) {
  if (values instanceof RegExp) {
    return {
      _type: "string",
      _pattern: values
    };
  } else if (Array.isArray(values)) {
    const tokens = values.map(function(v) {
      return getToken(v);
    });
    for (var i = 0; i < structures.length; i++) {
      const struct = isMatched(tokens, values, structures[i]);
      if (struct) {
        return toStructure(tokens, values, struct);
      }
    }
  }
};

module.exports = parameterTokenizer;
