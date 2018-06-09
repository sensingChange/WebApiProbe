/**
 * Created by:
 *  Bruno Lusvarghi Fernandes
 * 
 *  Bruno Bezerra da Silva
 *  Tainan de Fátima Ferraz Mafra
 *  Maythê Alves Bragança Tavares
 * 
 */

'use strict';
var db = require('../database/mongoose');
const config = require('../../config');

exports.list_measurements = function(req, res) {
    
  
    
};
    
  
exports.insert_measurements = function(req, res) {
  
  db.insertMeasurements(req.body);
  res.send("true");
};  

exports.getLastMeasurement = async function  (req, res) {
  let ret = await db.getLastMeasurement() ;
   res.send(ret);
};  

exports.getMonthMeasurement = async function (req, res) {
  let ret = await db.getMonthMeasurement();
   res.send(ret);
};  

exports.getDateMeasurement = async function (req, res) {
  
   let ret = await db.getDateMeasurement(req.params.date,req.params.macaddress);
    res.send(ret);
};  

exports.getDistinctDevices = async function(req,res){
    console.log("Distinct Device");
    res.send(await db.getDistinctDevices());
};