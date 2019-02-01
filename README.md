# MakeFake
Create data for test, design and other development processes needs data to continue fast.

## Table of Contents
1. [Installation](#installation)<br>
2. [Example use case](#example-use-case)<br>
3. [Features](#features)<br>
4. [Documentation](#documentation)<br>

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
MakeFake can create any primitive and non-primitive data just like array or object randomly that contains other primitive or non-primitive data types.<br><br>
**Basic data structure**<br>
Define your data structure as same result object.<br><br>
**Custom data formatting**<br>
MakeFake allows intervention to editing data during creating.


## Documentation
### Data types
### String 
```javascript
let namesArray = ["Mahmut", "Brain", "Elizabeth"];

makefake({
  _type: 'string',
  _source: namesArray
}) /* Result is one of namesArray item. */

makefake({
  _type: 'string',
  _length: 10,
  _charset: 'a-z'
}) /* Result is just like that: "qwekjaskdj" */

/* You can set _character to 'a-Z', 'A-Z', '0-9', 'Symbol' */
/* You can set _character to custom characters just like "abcd1234". */
/* You can set _character to custom char code range just like that */

makefake({
  _type: 'string',
  _length: 20,
  _charset: [48, 57]
})

/* Or you can set multiple character sets just like that */
makefake({
  _type: 'string',
  _length: 20,
  _charset: ["customcharacters1234", 'a-Z', [48, 57]]
})

```