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

    app.route('/GetDateMeasurement/:date')
    .get(measurement.getDateMeasurement);
  
};
