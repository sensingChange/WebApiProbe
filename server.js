/**
 * Created by:
 *  Bruno Lusvarghi Fernandes
 * 
 *  Bruno Bezerra da Silva
 *  Tainan de Fátima Ferraz Mafra
 *  Maythê Alves Bragança Tavares
 * 
 */

const bodyParser = require('body-parser');
const config = require('./config');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json'}));
//
  
  
  var routes = require('./api/routes/measurementRoute'); //importing route
  routes(app); //register the route
  app.listen(port);
  console.log('Server started on: ' + port);