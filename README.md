# MakeFake
Create data for test, design and other development processes needs data to continue fast.

## Table of Contents
  - [Installation](#installation)
  - [Example use case](#example-use-case)
  - [Features](#features)
  - [Documentation](#documentation)
    - [String](#string)
    - [Number](#number)
    - [Boolean](#boolean)
    - [Array](#array)
    - [Object](#object)
    - [Color](#color)
    - [Photo](#photo)

## Installation
```
npm install makefake
```
## Example use case
Let's assume you have a design just like that and you wanna create ListView for this. But you don't have data currently. You just developing frontend.

![N|DesignExample](https://raw.githubusercontent.com/mahmuttaskiran/makefake/master/images/p1.png)
```javascript
let userList = makefake({
  _type: 'array',
  _length: 100,
  _content: {
    "name": {
      _type: 'string',
      _source: FakeNames
    },
    "profilePicture": {
      _type: 'photo'
    },
    "isOnline": {
      _type: 'boolean',
      _truePossibilityPercent: 70
    },
    "username": {
      _type: 'string',
      _source: FakeUserNames,
      _formatter: (data) => '@' + data
    }
  }
});
```
This codes produces an array contain one hundred different user object just like that:
```json
[
  {
    name: "Marion Croghan",
    profilePicture: "https://picsum.photos/400/400/?key=0&random",
    isOnline: true,
    username: "@reappearpackage"
  },
  {
    name: "Yuonne Magdaleno",
    profilePicture: "https://picsum.photos/400/400/?key=1&random",
    isOnline: false,
    username: "@apacheemm"
  }
  ...
];
```
It's just a simple use case. Let's see Features and Documentation to understand what you can do with this library.

## Features
**Random data creating**<br>
MakeFake can create any primitive and non-primitive data just like array or object randomly that contains other primitive or non-primitive data types.<br>
**Basic data structure**<br>
Define your data structure as same result object.<br>
**Custom data formatting**<br>
MakeFake allows intervention to editing data during creating.<br>

## Documentation
### Data types
### String 
Arguments: **_source**: array, **_charset**: string or array, **_length**: number, **_formatter**: function(data, content)
```javascript
let namesArray = ["Mahmut", "Brain", "Elizabeth"];
makefake({
  _type: 'string',
  _source: namesArray
}) // Result (Random):  "Mahmut"

/* There are couple of predefined data model for _source:
   makefake.nameSurname: contains name and surname.
   makefake.username: contains random usernames.
   makefake.word: contains english words.
   makefake.language: contains languages.
   makefake.paragraph: contains paragraphs.
   makefake.sentence: contain sentences.  
*/

makefake({
  _type: 'string',
  _source: makefake.nameSurname
}) // Result (Random result in makefake.nameSurname array): 'Willie Heppner'

makefake({
  _type: 'string',
  _length: 10,
  _charset: 'a-z'
}) // Result (Random): "qwekjaskdj" 

// You can set _character to 'a-Z', 'A-Z', '0-9', 'Symbol' 
// You can set _character to custom characters just like "abcd1234". 

// You can set _character to custom char code range just like that.
makefake({
  _type: 'string',
  _length: 5,
  _charset: [48, 57]
}) // Result (Random): 34512

// Or you can set multiple character sets just like that 
makefake({
  _type: 'string',
  _length: 5,
  _charset: ["customcharacters1234", 'a-Z', [48, 57]]
}) // Result (Random): Z1ctMs

// use _formatter to edit produced data
makefake({
  _type: 'string',
  _source: ['username'],
  _formatter: (data, content) => '@' + data
}) // Result (Exactly): @username
```

### Number
Arguments: **_max**: number, **_min**: number, **_float**: boolean, **_index**: boolean, **_formatter**: function(data, content)
```javascript
makefake({
  _type: 'number'
  // default _max is 100,
  // default _min is 0,
}) // Result (Random): 11

makefake({
  _type: 'number',
  _min: 2000,
  _max: 2020,
}) // Result (Random): 2019

makefake({
  _type: 'number',
  _min: 10,
  _max: 100,
  _float: true,
  _formatter: (data, content) => data.toFixed(2)
}) // Result (Random): 40.39

makefake({
  _type: 'array',
  _length: 10,
  _content: {
    _type: 'number',
    _index: true,
  }
}) // Result (Exactly): [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

makefake({
  _type: 'array',
  _length: 10,
  _content: {
    // number defination start
    _type: 'number',
    _formatter: (data, content) => content.getParam('index') * 2
    // number defination end
  },
  _formatter: (data, content) => data.reverse()
}) // Result (Exactly): [ 18, 16, 14, 12, 10, 8, 6, 4, 2, 0 ]

/*
What is happening here?
In 'number' defination _formatter gives a 'content' argument represents number's parent, in this case parent is array, and every array has a 'index' param represents current array index.

In 'array' defination _formatter gives a data argument
represents array data. We just reversed it.
*/
```
### Boolean
Arguments: **_truePossibilityPercent**: number, **_formatter**: function (data, content)<br>
**_truePossibilityPercent** is number between 0 and 100.

```javascript
makefake({
  _type: 'boolean',
  _truePossibilityPercent: 100
}) // Result (Exactly): true

makefake({
  _type: 'boolean',
  _truePossibilityPercent: 0
}) // Result (Exactly): false

makefake({
  _type: 'boolean',
  _truePossibilityPercent: 49
}) // Result (Random): true
```

### Array
Arguments: **_length**: number, **_content**: object
```javascript
makefake({
  _type: 'array',
  _length: 10,
  _content: {
    _type: 'boolean',
    _formatter: (data, content) => content.getParam('index') % 2 === 0
  }
}) // Result (Exactly) [ true, false, true, false, true, false, true, false, true, false ]
```

### Object
Arguments: No argument
```javascript
// create car object
makefake({
  "year": {
    _type: 'number',
    _min: 1990,
    _max: 2019
  },
  "brand": {
    _type: 'string',
    _source: ['Ford', 'Audi', 'BMW', 'Ferrari']
  },
  "price": {
    _type: 'number',
    _min: 5000,
    _max: 100000
  },
  "isExpensive": {
    _type: 'boolean',
    _formatter: (data, content) => {
      return content.getData().price > 40000
    }
  }
}) // Result (Random) { year: 2014, brand: 'BMW', price: 52737, isExpensive: true }
```

### Color
Arguments: **_hue**: color, **_luminosity**: color, **_format**: string, **_alpha**: number<br>
[See Random Color Documentation](https://github.com/davidmerfield/randomColor)
```javascript
makefake({
  _type: 'color',
  _hue: 'blue',
  _format: 'rgb',
}) // Result (Random): rgb(163, 162, 242)
```

### Photo
Arguments: **_width**: color, **_height**: color, **_format**: string, **_alpha**: number<br>
https://picsum.photos/
```javascript
makefake({
  _type: 'photo',
  _width: 500,
  _height: 500
}) // Result (Random): https://picsum.photos/400/400/?key=0.47288896556640103&random
```

### License
```
Copyright 2019 Mahmut Taşkıran

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```