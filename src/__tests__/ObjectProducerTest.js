const makefake = require('../../index');
it('should create array has two object that contains user information', function () {

  const userList = makefake({

    list: {
      _type: 'array',
      _length: 2,
      _content: {
        id: {
          _type: 'number',
          _index: true
        },
        name: {
          _type: 'string',
          _source: ['Mahmut']
        }
      }
    },

    listSize: {
      _type: 'number',
      _formatter: function (data, context) {
        return context.getData().list.length;
      }
    }

  });

  expect(userList).toEqual({
    list: [
      {
        id: 0,
        name: 'Mahmut'
      },
      {
        id: 1,
        name: 'Mahmut'
      }
    ],
    listSize: 2
  })

});