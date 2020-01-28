// Initializes the `GeodataLayerObjectSchemes` service on path `/objects`
const { GeodataLayerObjectSchemes } = require('./geodata-layer-object-schemes.class');
const createModel = require('../../models/layer-object-scheme.model');
const hooks = require('./geodata-layer-object-schemes.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/objects', new GeodataLayerObjectSchemes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('objects');

  service.hooks(hooks);
};
