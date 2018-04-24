

const bodyParser = require('body-parser');
const config = require('./config');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json'}))
//app.use(bodyParser.urlencoded({extended: true}))
  
  
  var routes = require('./api/routes/measurementRoute'); //importing route
  routes(app); //register the route
  app.listen(port);
  console.log('Server started on: ' + port);