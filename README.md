# MakeFake
Create data for test, design and other development processes needs data to continue fast.

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Example use case](#example-use-case)
  - [Features](#features)
  - [Documentation](#documentation)
    - [Data types](#data-types)
    - [String](#string)
    - [Number](#number)

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
  In 'number' defination _formatter gives 
  a 'content' argument represents number's parent, in this case 
  parent is array, and every array has a 'index' param represents 
  current array index.

  In 'array' defination _formatter gives a data argument
  represents array data. We just reversed it.
*/


```