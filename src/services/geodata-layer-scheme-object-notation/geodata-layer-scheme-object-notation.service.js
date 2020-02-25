// Initializes the `GeodataLayerSchemeObjectNotation` service on path `/objects`
const {
  GeodataLayerSchemeObjectNotation,
} = require('./geodata-layer-scheme-object-notation.class');
const createModel = require('../../models/layer-scheme-object-notation.model');
const hooks = require('./geodata-layer-scheme-object-notation.hooks');

module.exports = function(app) {
  //TODO: настроить создание новых объектов для обновления состояния привязанных схем
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    allowedEager: '[scheme]',
  };

  // Initialize our service with any options it requires
  app.use('/objects', new GeodataLayerSchemeObjectNotation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('objects');

  service.hooks(hooks);
};
