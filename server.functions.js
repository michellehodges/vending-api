'use strict'
/* This file exists because we want to be able to import this in two different places. */

/*************** DATABASE SETUPS HERE ****************/
const Sequelize = require('sequelize');

const db = new Sequelize('vending_development', 'mischy', '', {
  dialect: 'postgres',
})

const Item = db.define('item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const Purchase = db.define('purchase', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

Item.sync()
  .then(function(){
    console.log('Item models synced')
    // Item.bulkCreate([
    //   { name: 'Lemonheads', price: 1.00, quantity: 9 },
    //   { name: 'Mars Bars', price: 1.50, quantity: 10 },
    //   { name: 'Sriracha candy', price: 0.75, quantity: 11 },
    //   { name: 'Kale Nutribars', price: 2.00, quantity: 20 },
    //   { name: 'Popcorn Water', price: 1.25, quantity: 20 },
    //   { name: 'Butter balls', price: 1.15, quantity: 24 },
    //   { name: 'Choco Mapleshots', price: 2.15, quantity: 15 },
    //   { name: 'Yoda Fudgies', price: 1.50, quantity: 18 },
    //   { name: 'Benjamins Teadrops', price: 1.00, quantity: 21 },
    //   { name: 'Poopsickles', price: 2.00, quantity: 14 },
    //   { name: 'Ramen cakes', price: 2.50, quantity: 19 },
    //   { name: 'Cloud9', price: 1.00, quantity: 10 }
    // ])
  }).then(function(){
      Purchase.sync()
        .then(function(){
          console.log('Purchase models synced')
          // Purchase.bulkCreate([
          //   { name: 'Lemonheads', price: 1.00 },
          //   { name: 'Mars Bars', price: 1.50 },
          //   { name: 'Sriracha candy', price: 0.75 },
          //   { name: 'Kale Nutribars', price: 2.00 },
          //   { name: 'Popcorn Water', price: 1.25 },
          //   { name: 'Butter balls', price: 1.15 },
          //   { name: 'Choco Mapleshots', price: 2.15 },
          //   { name: 'Yoda Fudgies', price: 1.50 },
          //   { name: 'Benjamins Teadrops', price: 1.00 },
          //   { name: 'Poopsickles', price: 2.00 },
          //   { name: 'Ramen cakes', price: 2.50 },
          //   { name: 'Cloud9', price: 1.00 }
          // ])
        })
  });

/*************** GLOBAL FUNCTIONS  HERE ****************/
function getListOfItems() {
  return Item.findAll();
}

function buyItem(money, item) {
  return Item.findOne({ where: { id: item } })
          .then(function (data) {
            if (money >= data.price) {
              Item.update({ quantity: data.quantity - 1 }, { where: { name: data.name }})
              Purchase.create({ name: data.name, price: data.price });
              return money - data.price;
            }
          });
}

function getError(item) {
  return Item.count({ where: { id: item } })
    .then(count => {
      if (count != 0) {
        buyItem(item);
        return (item);
      } else {
        return ("Sorry, we don't have that item in this machine.")
      }
    })
}

// TODO
// A vendor should be able to see total amount of money in machine
function viewTotalMoneys(totalMoney) {
  // return Purchase.findAll({
  //   for (let i = 0; i < Purchase.length; i++) {
  //     //add purchases.price here
  //   }
  // })
}

function viewPurchasedItems() {
  return Purchase.findAll();
}

function updateItem(item) {
  return Item.findOne({ where: { id: item } })
    .then(function(data){
      Item.update({
        name: data.name,
        quantity: data.quantity,
        price: data.price
      })
    })
}

function addNewItem(item) {
  return Item.create({
    name: item.name,
    quantity: item.quantity,
    price: item.price
  });
}


/*************** MODULE EXPORTS HERE ****************/
module.exports = {
  getListOfItems: getListOfItems,
  buyItem: buyItem,
  getError: getError,
  viewTotalMoneys: viewTotalMoneys,
  viewPurchasedItems: viewPurchasedItems,
  updateItem: updateItem,
  addNewItem: addNewItem
};
