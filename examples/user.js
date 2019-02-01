const makefake = require("../index");
const FakeNames = require("../src/fakesources/FakeNames");
const FakeUserNames = require("../src/fakesources/FakeUserNames");

const userList = makefake({
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
      _formatter: function (data) {
        return "@" + data;
      }
    }
  }
});

console.log(userList);