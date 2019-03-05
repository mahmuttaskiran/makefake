const makefake = require("../index");

// this produces single user object
const user = makefake({
  // generate random name (string)
  name: /[A-Z][a-z]{3,8}/,
  // generate random surname (string)
  surname: /[A-Z][a-z]{3,8}/,
  // this represents this object
  fullName: [
    function() {
      return this.name + " " + this.surname;
    }
  ],
  // generate random number between 13 and 65
  age: [13, 65],
  // pick an object randomly (in this case string) in array. (male or female)
  gender: [["male", "female"]]
});

// this produces an array containing 20 user object
const users = makefake([
  {
    name: /[A-Z][a-z]{3,8}/,
    surname: /[A-Z][a-z]{3,8}/,
    // this represents this array
    fullName: [
      function() {
        const currentUser = this[this.length - 1];
        return currentUser.name + " " + currentUser.surname;
      }
    ],
    age: [13, 65],
    gender: [["male", "female"]]
  },
  20
]);
