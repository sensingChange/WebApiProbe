'use strict';
var db = require('../database/connection');
const config = require('../../config');

exports.list_measurements = function(req, res) {
    
  console.log(req.body);
    
};
    
  
exports.insert_measurements = function(req, res) {
  db.connect();
  db.insertMeasurement(req.body);
};  