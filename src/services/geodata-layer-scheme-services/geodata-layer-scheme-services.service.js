// Initializes the `GeodataLayerSchemeServices` service on path `/services`
const { GeodataLayerSchemeServices } = require('./geodata-layer-scheme-services.class');
const createModel = require('../../models/layer-scheme-service.model');
const hooks = require('./geodata-layer-scheme-services.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/services', new GeodataLayerSchemeServices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('services');

  service.hooks(hooks);
};
