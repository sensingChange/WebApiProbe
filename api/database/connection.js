const mysql      = require('mysql');
const dateFormat = require('dateformat');
const config = require('../../config');

console.log(config.host);
console.log(config.password);
console.log(config.user);
console.log(config.database);

var connection = mysql.createConnection({
  host    : config.host,
  user    : config.user,
  password: config.password,
  database:  config.database
});

exports.connect = function(err) {
 
  if(connection.state == "disconnected")
  {
    connection.connect();

    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  }
};

exports.disconnect = function(err){
  connection.end();
}

exports.testConnection = function(){

  connection.query('SELECT 1', function (error, results, fields) {
    console.log(results);
    // connected!
  });
}

exports.insertMeasurement = function(data){
   
    const size = data.length;
    
    var query = "";
     
    
    for(let i=0;i<size;i++)
    {

      
      query = "insert into measurement values (null,"+ 1 +",'"
      + dateFormat(data[0].timestamp,"yyyy-mm-dd h:MM:ss")  +"')";
      connection.query(query, function (error, results, fields) {
        console.log(error);
      let id = results.insertId;
      

      let ambient = data[i].ambient;
      let soil = data[i].soil;
      let res;

      soil.temperature.unity = soil.temperature.unity.toString().replace("º","").replace("°","");
      ambient.temperature.temperature.unity = ambient.temperature.temperature.unity.toString().replace("º","").replace("°","");
      
      query = "insert into airhumidity values(null,"+ id + ',' + ambient.temperature.humidity.value +")";
       res = insertQuery(query);
       

      query = "insert into airtemperature values(null," +  id + ',' + ambient.temperature.temperature.value 
      +",'" + ambient.temperature.temperature.unity +"')";
       res = insertQuery(query);
       

      query = "insert into soilhumidity values(null,"+ id + "," + soil.conversor.value  +")";
       res = insertQuery(query);
       
      

      query = "insert into soiltemperature values(null,"+ id + ',' + soil.temperature.value + ",'" + soil.temperature.unity +"')";
       res = insertQuery(query);
      }); 
     }

}


function insertQuery(queryStr)
{
  connection.query(queryStr, function (error, results, fields) {

  console.log(error);
  
  });
}