'use strict';
const Mongoose = require('mongoose');

var db = Mongoose.connection;

db.on('error', console.error);
var measurementSchema;
var Measurement;


  
   measurementSchema = new Mongoose.Schema({
    macaddress:String,
    name: String,
    date: Date,
    air:{humidity:{value: Mongoose.Schema.Types.Decimal128,unity: String},
    temperature:{value:Mongoose.Schema.Types.Decimal128,unity:String}},
    soil:{humidity:{value:Mongoose.Schema.Types.Decimal128,unity:String},
    temperature:{value:Mongoose.Schema.Types.Decimal128,scale:String,unity:String}}
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