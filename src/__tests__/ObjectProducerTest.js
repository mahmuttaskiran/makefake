const makefake = require("../../index");
it("should create array has two object that contains user information", function() {
  const userList = makefake({
    list: {
      _type: "array",
      _length: 2,
      _content: {
        id: {
          _type: "number",
          _index: true
        },
        name: {
          _type: "string",
          _source: ["Mahmut"]
        }
      }
    },

    listSize: {
      _type: "number",
      _formatter: function() {
        return this.list.length;
      }
    }
  });

  expect(userList).toEqual({
    list: [
      {
        id: 0,
        name: "Mahmut"
      },
      {
        id: 1,
        name: "Mahmut"
      }
    ],
    listSize: 2
  });
});

it("should bind", function() {
  const obj = makefake({
    name: {
      _type: "string"
    },
    surname: {
      _type: "string",
      _formatter: function (data) {
        return data;
      }
    },
    arr: {
      _type: 'array',
      _length: 10,
      _content: {
        number: {
          _type: 'number',
          _formatter: function (data) {
            return data;
          }
        }
      }
    }
  });
  console.log('obj', obj);
});
