'use strict';
var db = require('../database/mongoose');
const config = require('../../config');

exports.list_measurements = function(req, res) {
    
  console.log(req.body);
    
};
    
  
exports.insert_measurements = function(req, res) {
  console.log(req.body);
  db.insertMeasurements(req.body);
};  