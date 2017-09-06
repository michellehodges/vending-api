const request = require('supertest');
const server = require('./server.functions');

describe('getListOfItems returns a bunch of items', function () {
  test('receive a promise with 12 items', function () {
    server.getListOfItems().then(function (items) {
      expect(items.length).toBe(15);
    });
  });
});

describe('buyItem updates quantity and gives change', function () {
  test('updates item quantity', function () {
    server.addNewItem({
      name: 'Ben Candy',
      quantity: 5,
      price: 0.45,
    }).then(function (newCandy) {
      server.buyItem(5, newCandy.id).then(function (item) {
        expect(item.quantity).toBe(4);
      }).then(function (deleteCandy) {
        Item.destroy({ where: { name: 'Ben Candy' } });
      })
    });
  });

  test('creates new purchased item', function () {
    let purchaseLength;
    server.buyItem(3, 'Ramen cakes').then(function (item) {
      purchaseLength = Purchase.length;
      expect(purchaseLength).toBe(purchaseLength + 1);
    });
  });
});

// describe('getError returns an error message', function () {
//   test('returns an error message', function () {
//     server.getError("chickadees").then(function (response) {
//       expect(response).toBe("Sorry, we don't have that item in this machine.")
//     })
//   })
// })


function viewTotalMoneys(totalMoney) {
  return Purchase.sum('price');
}

describe('viewTotalMoneys returns total of money', function () {
  test('total money should return', function () {
    server.viewTotalMoneys().then(function (total) {
      expect(total).toBe(18.25)
    })
  })
})

describe('viewPurchasedItems returns all purchased items', function () {
  test('purchased items should return', function () {
    server.viewPurchasedItems().then(function(items) {
      expect(items.length).toBe(13);
    })
  })
})

describe('updateItem updates... an item', function() {
  test('items were updated', function () {
    server.addNewItem({
      name: 'Boom! Bars',
      quantity: 5,
      price: 0.45,
    }).then(function (newCandy) {
    server.updateItem(newCandy.id).then(function(item) {
      expect(item.name).toBe('Snickers')
      })
    })
  })
})

describe('addNewItem adds.... a new item', function() {
  test('items were added', function () {
    server.addNewItem({
      name: 'Hey There, Healthbars',
      quantity: 45,
      price: 3.25,
    }).then(function(items) {
      expect(Items.length).toBe(14)
    })
  })
})

// describe('GET /', function() {
//   test('responds with json', function() {
//     request(server)
//       .get('/')
//       .expect(200);
//   });
// });
