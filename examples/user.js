const makefake = require('makefake');

const userList = makefake({
  _type: 'array',
  _length: 100,
  _content: {
    "name": {
      _type: 'string',
      _source: makefake.nameSurname
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
      _source: makefake.username,
      _formatter: function (data) {
        return "@" + data;
      }
    }
  }
});

console.log(userList);
