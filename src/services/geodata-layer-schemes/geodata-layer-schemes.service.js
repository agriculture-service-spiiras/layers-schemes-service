// Initializes the `GeodataLayerSchemes` service on path `/rest`
const { GeodataLayerSchemes } = require('./geodata-layer-schemes.class');
const createModel = require('../../models/geodata-layer-schemes.model');
const hooks = require('./geodata-layer-schemes.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/rest', new GeodataLayerSchemes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rest');

  service.hooks(hooks);
};
