# MakeFake
Make easier to create data for test, design and other development process need data to continue fast.

#### Installation

```
npm install makefake
```

Let's assume you have a design just like that and you wanna create ListView for this. But you dont have data currently. You just devoloping frontend.

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
This codes produces an array contain one hundred different user object just like that.
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