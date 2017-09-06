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
  money_needed: {
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
    allowNull: false
  },
  money_needed: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  money_given: {
    type: Sequelize.DECIMAL,
    allowNull: true
  }
})

Item.sync()
  .then(function(){
    console.log('Item models synced')
    // Item.bulkCreate([
    //   { name: 'Lemonheads', money_needed: 1.00, quantity: 9 },
    //   { name: 'Mars Bars', money_needed: 1.50, quantity: 10 },
    //   { name: 'Sriracha candy', money_needed: 0.75, quantity: 11 },
    //   { name: 'Kale Nutribars', money_needed: 2.00, quantity: 20 },
    //   { name: 'Popcorn Water', money_needed: 1.25, quantity: 20 },
    //   { name: 'Butter balls', money_needed: 1.15, quantity: 24 },
    //   { name: 'Choco Mapleshots', money_needed: 2.15, quantity: 15 },
    //   { name: 'Yoda Fudgies', money_needed: 1.50, quantity: 18 },
    //   { name: 'Benjamins Teadrops', money_needed: 1.00, quantity: 21 },
    //   { name: 'Poopsickles', money_needed: 2.00, quantity: 14 },
    //   { name: 'Ramen cakes', money_needed: 2.50, quantity: 19 },
    //   { name: 'Cloud9', money_needed: 1.00, quantity: 10 }
    // ])
  }).then(function(){
      Purchase.sync()
        .then(function(){
          console.log('Purchase models synced')
          // Purchase.bulkCreate([
          //   { name: 'Lemonheads', money_needed: 1.00, money_given: 1.50 },
          //   { name: 'Mars Bars', money_needed: 1.50, money_given: 1.50 },
          //   { name: 'Sriracha candy', money_needed: 0.75, money_given: 1.50 },
          //   { name: 'Kale Nutribars', money_needed: 2.00, money_given: 2.50 },
          //   { name: 'Popcorn Water', money_needed: 1.25, money_given: 1.50 },
          //   { name: 'Butter balls', money_needed: 1.15, money_given: 1.50 },
          //   { name: 'Choco Mapleshots', money_needed: 2.15, money_given: 2.50 },
          //   { name: 'Yoda Fudgies', money_needed: 1.50, money_given: 1.50 },
          //   { name: 'Benjamins Teadrops', money_needed: 1.00, money_given: 1.50 },
          //   { name: 'Poopsickles', money_needed: 2.00, money_given: 2.50 },
          //   { name: 'Ramen cakes', money_needed: 2.50, money_given: 2.50 },
          //   { name: 'Cloud9', money_needed: 1.00, money_given: 1.50 }
          // ])
        })
  });

/*************** GLOBAL FUNCTIONS  HERE ****************/
function getListOfItems() {
  return Item.findAll()
    .catch(function(err) {
      return Promise.reject('items do not exist');
    });
}

function buyItem(money, itemName) {
  return Item.findOne({ where: { name: itemName } })
          .then(function (data) {
            if (data === null) {
              return Promise.reject('item doesnt exist');
            } else if (money >= data.money_needed) {
              Item.update({ quantity: data.quantity - 1 }, { where: { name: data.name }})
              Purchase.create({ name: data.name, money_needed: data.money_needed, money_given: money });
              return money - data.money_needed;
            } else if (money < data.money_needed) {
              return Promise.reject('not enough money');
            }
          });
}

// function getError(item) {
//   return Item.count({ where: { id: item } })
//     .then(count => {
//       if (count != 0) {
//         buyItem(item);
//         return (item);
//       } else {
//         return ("Sorry, we don't have that item in this machine.")
//       }
//     })
// }

function viewTotalMoneys(totalMoney) {
  return Purchase.sum('money_needed')
    .catch(function (err) {
      return Promise.reject('no money in machine')
    });
}

function viewPurchasedItems() {
  return Purchase.findAll()
    .catch(function(err) {
      return Promise.reject('items do not exist');
    });
}

function updateItem(item) {
  return Item.update({
            quantity: item.quantity,
            money_needed: item.money_needed
          },
          { where: { name: item.name } }).catch(function(err) {
            return Promise.reject('cannot update item')
          });
}

function addNewItem(item) {
  return Item.create({
            name: item.name,
            quantity: item.quantity,
            money_needed: item.money_needed
          }).catch(function(err) {
            return Promise.reject('cannot add item')
          });
}


/*************** MODULE EXPORTS HERE ****************/
module.exports = {
  getListOfItems: getListOfItems,
  buyItem: buyItem,
  viewTotalMoneys: viewTotalMoneys,
  viewPurchasedItems: viewPurchasedItems,
  updateItem: updateItem,
  addNewItem: addNewItem
};
