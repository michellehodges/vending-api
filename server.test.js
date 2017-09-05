const request = require('supertest');
const server = require('./server.functions');

describe('getListOfItems returns a bunch of items', function () {
  test('receive a promise with 12 items', function () {
    server.getListOfItems().then(function (items) {
      expect(items.length).toBe(12);
    });
  });
});

describe('buyItem updates quantity and gives change', function () {
  test('updates item quantity', function () {

    server.addNewItem({
      name: 'No One Cares Candy',
      quantity: 5,
      price: 0.45,
    }).then(function (newCandy) {
      server.buyItem(5, newCandy.id).then(function (item) {
        expect(item.quantity).toBe(4);
      });
    });
  });

  //   test('creates new purchased item', function () {
  //     server.buyItem().then(function (item) {
  //       expect(Purchase.length).toBe(13);
  //     });
  // });
});

// describe('getError returns an error message', function () {
//   test('returns an error message', function () {
//     server.getError("chickadees").then(function (response) {
//       expect(response).toBe("Sorry, we don't have that item in this machine.")
//     })
//   })
// })




// describe('GET /', function() {
//   test('responds with json', function() {
//     request(server)
//       .get('/')
//       .expect(200);
//   });
// });
