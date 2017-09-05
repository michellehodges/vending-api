//Dependencies
const express = require('express');
const bodyparser = require('body-parser');
const functions = require('./server.functions');

const server = express();

//Server configure
server.use(bodyparser.urlencoded( { extended: false }));

//REQUESTS

server.post('/stuffff', function (req, res) {
  buyItem(10, 'Snickers').then(function (change) {
    res.json({ change: change });
  });
});




// //LISTEN TO PORT
// server.listen(3000, function() {
//   console.log("GET YO VENDING ON");
// })
