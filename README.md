# MakeFake
Create data for test, design and other development processes needs data to continue fast.

##### Table of Contents
1. [Installation](#installation-instructions)<br>
2. [Example use case](#usage-instructions)<br>
3. [Features](#troubleshooting)<br>
4. [Documentation](#compatibility)<br>
. [Data types](#notes-and-miscellaneous)<br>
. [Understanding _formatter](#building-the-extension-bundles)<br>
. [Understanding content](#next-steps)<br>

### Installation
```
npm install makefake
```
### Example use case
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
];
```
It's just a simple use case. Let's see Features and Documentation to understand what you can do with this library.