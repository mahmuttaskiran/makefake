const makefake = require("../index");
const FakeNames = require("../src/fakesources/FakeNames");
const FakeUserNames = require("../src/fakesources/FakeUserNames");

const users = [
  {
    name: "Marion Croghan",
    profilePicture: "https://picsum.photos/400/400/?key=0&random",
    isOnline: true,
    username: "reappearpackage"
  },
  {
    name: "Yuonne Magdaleno",
    profilePicture: "https://picsum.photos/400/400/?key=1&random",
    isOnline: false,
    username: "apacheemm"
  }
];

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
      _source: FakeUserNames
    }
  }
});