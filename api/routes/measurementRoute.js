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

module.exports = function(app) {
  var measurement = require('../controllers/measurementController');

  // todoList Routes
  app.route('/measurement')
    .get(measurement.list_measurements)
    .post(measurement.insert_measurements);


    app.route('/LastMeasurement')
    .get(measurement.getLastMeasurement);

    app.route('/GetMonthMeasurement')
    .get(measurement.getMonthMeasurement);

    app.route('/GetDateMeasurement/:date/:macaddress')
    .get(measurement.getDateMeasurement);

    app.route('/GetDistinctDevices')
    .get(measurement.getDistinctDevices);
  
};
