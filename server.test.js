const request = require('supertest');
const server = require('./server.functions');

describe('getListOfItems returns a bunch of items', function () {
  test('receive a promise with 12 items', function () {
    server.getListOfItems().then(function (items) {
      expect(items.length).toBe(12);
    });
  });
});

// describe('GET /', function() {
//   test('responds with json', function() {
//     request(server)
//       .get('/')
//       .expect(200);
//   });
// });

// describe('Got list of items', function() {
//   test('responds with json', function() {
//
//   })
// })
