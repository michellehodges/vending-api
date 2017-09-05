//Dependencies
const express = require('express');
const bodyparser = require('body-parser');
const functions = require('./server.functions');

const server = express();

//Server configure
server.use(bodyparser.urlencoded( { extended: false }));

//Get requests
server.get('/listitems', function(request, response) {
  functions.getListOfItems().then(function(items) {
    response.json({ items: items });
  })
})

server.get('/purchaseditems', function(request, response) {
  functions.viewPurchasedItems().then(function(items) {
    response.json({ items: items });
  })
})

server.get('/totalmoney', function(request, response) {
  functions.viewTotalMoneys().then(function(totalmoney) {
    response.json({ totalmoney: totalmoney })
  })
})


//Post requests
server.post('/buy', function(request, response) {
  functions.buyItem(money, item).then(function (change) {
    response.json({ change: change });
  }).then(function (err) {
    response.send("Sorry, we don't have that item in this machine.")
  })
})

server.post('/update', function(request, response) {
  functions.updateItem().then(function(updatedItem) {
    response.json({ updatedItem: updateItem })
  })
})

server.post('/add', function(request, response) {
  functions.addNewItem().then(function(addedItem) {
    response.json({ addedItem: addedItem })
  })
})

//Listen to port
server.listen(3000, function() {
  console.log("GET YA VENDING ON");
})
