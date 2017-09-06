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
    response.json({
      status: 'success',
      data: items
    });
  }).catch(function(err){
      if (err === 'items do not exist') {
        response.json({
          status: 'failed',
          data: 'There are no items in this vending machine.'
        })
      }
  })
})

server.get('/purchaseditems', function(request, response) {
  functions.viewPurchasedItems().then(function(items) {
    response.json({
      status: 'success',
      items: items
    });
  }).catch(function(err){
      if (err === 'items do not exist') {
        response.json({
          status: 'failed',
          items: 'There are no items in this vending machine.'
        })
      }
  })
})

server.get('/totalmoney', function(request, response) {
  functions.viewTotalMoneys().then(function(totalmoney) {
    response.json({
      status: 'success',
      totalmoney: totalmoney
    })
  }).catch(function(err){
      if (err === 'no money in machine') {
        response.json({
          status: 'failed',
          totalmoney: 'There is no money in this vending machine.'
        })
      }
  })
})


//Post requests
server.post('/buy', function(request, response) {
  let money = request.body.money;
  let itemName = request.body.name;

  functions.buyItem(money, itemName).then(function (change) {
    response.json({ change: change });
  }).catch(function (err) {
      if (err === 'not enough money') {
        response.send("You did not enter enough money.");
      } else if (err === 'item doesnt exist') {
        response.send("Sorry, we don't have that item in this machine.")
      }
  })
})

server.post('/update', function(request, response) {
  let quantity = request.body.quantity;
  let name = request.body.name;
  let moneyNeeded = request.body.money_needed;

  let item = {
    quantity: quantity,
    name: name,
    money_needed: moneyNeeded
  };

  functions.updateItem(item).then(function(updatedItem) {
    response.json({
      status: 'success',
      updatedItem: updatedItem
    })
  }).catch(function (err) {
    if (err === 'cannot update item') {
      response.json({
        status: 'failed',
        updatedItem: 'Sorry, an error occured and we cannot update your item.'
      })
    }
  })
})

server.post('/add', function(request, response) {
  let name = request.body.name;
  let quantity = request.body.quantity;
  let moneyNeeded = request.body.money_needed;

  let item = {
    quantity: quantity,
    name: name,
    money_needed: moneyNeeded
  };

  functions.addNewItem(item).then(function(addedItem) {
    response.json({
      status: 'success',
      addedItem: addedItem
    })
  }).catch(function(err) {
    if (err === 'cannot add item') {
      response.json({
        status: 'failed',
        updatedItem: 'Sorry, an error occured and we cannot add your item.'
      })
    }
  })
})

//Listen to port
server.listen(3000, function() {
  console.log("GET YA VENDING ON");
})
