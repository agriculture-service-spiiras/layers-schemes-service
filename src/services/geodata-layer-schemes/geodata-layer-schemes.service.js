// Initializes the `GeodataLayerSchemes` service on path `/schemes`
const { GeodataLayerSchemes } = require('./geodata-layer-schemes.class');
const createModel = require('../../models/layer-scheme.model');
const hooks = require('./geodata-layer-schemes.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),

    whitelist: ['$eager', '$pick'],
    allowedEager: '[objects, services, childLayers]',
    allowedUpsert: '[childLayers, services, objects]',
    upsertGraphOptions: {
      relate: ['services'],
      unrelate: ['services'],
      noInsert: ['services'],
    },
    createUseUpsertGraph: true,
  };

  // Initialize our service with any options it requires
  app.use('/schemes', new GeodataLayerSchemes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('schemes');

  service.hooks(hooks);
};
