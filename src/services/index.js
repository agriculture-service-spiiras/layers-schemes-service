const geodataLayerSchemes = require('./geodata-layer-schemes/geodata-layer-schemes.service.js');
const geodataLayerObjectSchemes = require('./geodata-layer-object-schemes/geodata-layer-object-schemes.service.js');
const geodataLayerSchemeServices = require('./geodata-layer-scheme-services/geodata-layer-scheme-services.service.js');
// eslint-disable-next-line no-unused-vars

module.exports = function(app) {
  app.configure(geodataLayerSchemes);
  app.configure(geodataLayerObjectSchemes);
  app.configure(geodataLayerSchemeServices);
};
