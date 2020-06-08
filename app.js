'use strict';
/**
 * Module dependencies.
 */

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('config'),
    urlParse = require('url-parse');
let port = process.env.PORT || config.port; 
const auth = require("./middleware/auth");

mongoose
  .connect(
    config.dbURL
  )
  .then(() => {
    console.log(config.dbURL);
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

app.use(express.static(__dirname + '/public')); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('newForm')
})
const register = require('./routes/register');
app.use(register);

// =======================
// start the server ======
// =======================
app.listen(3000, '0.0.0.0');
console.log('Magic happens at http://localhost:' + 3000);
module.exports = app;