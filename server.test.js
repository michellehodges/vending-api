const request = require('supertest');
const server = require('./server.functions');

describe('getListOfItems returns a bunch of items', function () {
  test('receive a promise with 12 items', function () {
    server.getListOfItems().then(function (items) {
      expect(items.count).toBe(server.Item.findAll().length);
    });
  });
});

describe('buyItem updates quantity and gives change', function () {
  test('updates item quantity', function () {
    let itemQuantity;

    return server.getListOfItems().then(function(items) {
      itemQuantity = items.quantity;
        server.addNewItem({
          name: 'Sludge drink',
          quantity: 5,
          price: 0.45,
        }).then(function (newCandy) {
          server.buyItem(5, newCandy.id).then(function (item) {
            expect(itemQuantity).toBe(itemQuantity + 1);
          }).then(function() { deleteItem() })
        });
    })
  })
});

  test('creates new purchased item', function () {
    let purchaseLength;

    return server.getListOfItems().then(function(items) {
      purchaseLength = items.length;
      server.buyItem(3, 'Twizzlers').then(function (item) {
        expect(purchaseLength).toBe(purchaseLength + 1);
      }).then(function () { deleteItem() });
    })
  });

describe('viewTotalMoneys returns total of money', function () {
  test('total money should return', function () {
    server.viewTotalMoneys().then(function (total) {
      server.Purchase.sum('money_needed').then(function (sequelizeTotal) {
        expect(total).toBe(sequelizeTotal);
      });
    })
  })
})

describe('viewPurchasedItems returns all purchased items', function () {
  test('purchased items should return', function () {
    server.viewPurchasedItems().then(function(items) {

      expect(items.count).toBe(server.Purchase.findAll().length);
    })
  })
})

describe('updateItem updates... an item', function() {
  test('items were updated', function () {
    server.addNewItem({
      name: 'Pork jerky',
      quantity: 5,
      price: 0.45,
    }).then(function (newCandy) {
    server.updateItem(newCandy.id).then(function(item) {
      expect(item.name).toBe('Kitkats')
      }).then(function() { deleteItem() })
    })
  })
})

describe('addNewItem adds.... a new item', function() {
  test('items were added', function () {
    let itemsLength;

    return server.Item.findAll().then(function (items) {
      itemsLength = items.length;

      server.addNewItem({
        name: 'Deez Nutzbars',
        quantity: 45,
        price: 3.25,
      }).then(function() {
        server.Item.findAll().then(function (items) {
          expect(items.length).toBe(itemsLength + 1)
        });
      })
    })
  })
})
//
// test('creates new purchased item', function () {
//   let purchaseLength;
//
//   return server.getListOfItems().then(function(items) {
//     purchaseLength = items.length;
//     server.buyItem(3, 'Twizzlers').then(function (item) {
//       expect(purchaseLength).toBe(purchaseLength + 1);
//     }).then(function () { deleteItem() });
//   })
// });

// describe('GET /', function() {
//   test('responds with json', function() {
//     request(server)
//       .get('/')
//       .expect(200);
//   });
// });
