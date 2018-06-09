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
const Mongoose = require('mongoose');

var db = Mongoose.connection;

db.on('error', console.error);
var measurementSchema;
var Measurement;

    measurementSchema = new Mongoose.Schema({
    macaddress:String,
    name: String,
    timestamp: Date,
    luminosity: {unity:String,value: Mongoose.Schema.Types.Decimal128},
    air:{humidity:{value: Mongoose.Schema.Types.Decimal128,unity: String},
    temperature:{value:Mongoose.Schema.Types.Decimal128,unity:String}},
    soil:{humidity:{value:Mongoose.Schema.Types.Decimal128,unity:String},
    temperature:{value:Mongoose.Schema.Types.Decimal128,scale:String,unity:String}},
    gps:{geoJson:{
     coordinates:[Number,Number]},
      dmm:{latitude:Number,longitude:Number}}
    });
  
  Mongoose.connect('mongodb://localhost/monitoring');
  

exports.listMeasurements = async  function(){
  Measurement = Mongoose.model('Measurement', measurementSchema);
  var result = [];
  await Measurement.find(function(err,data){
    result =  data;
  });
 return result; 
};

exports.insertMeasurements =  function(data){

    console.log(data);
    Measurement = Mongoose.model('Measurement', measurementSchema);
    
    data.forEach(element => {
      let dataInsert = new Measurement(element);
      dataInsert.save(function(err,ret) {
        if (err) return console.error(err);
      });
      
    });

    return true;  
    
  };

  
exports.getLastMeasurement = async  function(){
  Measurement = Mongoose.model('Measurement', measurementSchema);
  var result = [];
  await Measurement.findOne({},{},{sort:{'timestamp':-1}},function(err,data){
    result =  data;
  });
 return result; 
};


exports.getMonthMeasurement = async function(){
  Measurement = Mongoose.model('Measurement', measurementSchema);
  var result = [];
  await Measurement.aggregate([
    {
     $match:{
        timestamp:{
          $gte: new Date("2018-05-01T00:00:00.000Z"),
          $lt: new Date("2018-05-31T23:59:59.000Z")
        }
     } 
  }],
    function(err,data){
      result =  data;
      console.log(data);
  });
 return result; 
};


exports.getDateMeasurement = async function(date,mac){
  Measurement = Mongoose.model('Measurement', measurementSchema);
  var result = [];
  await Measurement.aggregate([
    {
     $match:{
        macaddress:mac, 
        timestamp:{
          $gte: new Date(date + "T00:00:00.000Z"),
          $lt: new Date(date + "T23:59:59.999Z")
        }
     }
  }],
    function(err,data){
      result =  data;
      console.log(data);
  });
 return result; 
};


exports.getDistinctDevices = async function(){

  Measurement = Mongoose.model('measurement',measurementSchema);

  var result = [];
  var listMac = [];
  await Measurement.find({}).distinct('macaddress',function (err,data) {
    listMac = data;
    });

    for(let i =0;i<listMac.length;i++)
    {
     result.push(await  Measurement.findOne({'macaddress':listMac[i]},{},{sort:{'timestamp':-1}}).exec());
      
    }
console.log(result);
   
  return result;

}