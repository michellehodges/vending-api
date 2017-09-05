//Dependencies
const express = require('express');
const bodyparser = require('body-parser');
const functions = require('./server.functions');

const server = express();

//Server configure
server.use(bodyparser.urlencoded( { extended: false }));

//REQUESTS
// A customer should be able to get a list of the current items, their costs, and quantities of those items


//
// app.get('/items', function (req, res) {
//   getListOfItems().then(function (items) {
//     res.json(items):
//   });
// });

  //   if (request.session.who !== undefined) {
  //     Message.findAll()
  //       .then(function(err, results){
  //         response.render('main', {
  //           gabbles: results,
  //           username: request.session.who[0].username,
  //           })
// }

// //LISTEN TO PORT
// server.listen(3000, function() {
//   console.log("GET YO VENDING ON");
// })
