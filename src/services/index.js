const geodataLayerSchemes = require('./geodata-layer-schemes/geodata-layer-schemes.service.js');
const geodataLayerSchemeServices = require('./geodata-layer-scheme-services/geodata-layer-scheme-services.service.js');
const geodataLayerSchemeObjectNotation = require('./geodata-layer-scheme-object-notation/geodata-layer-scheme-object-notation.service.js');
// eslint-disable-next-line no-unused-vars

module.exports = function(app) {
  app.configure(geodataLayerSchemes);
  app.configure(geodataLayerSchemeServices);
  app.configure(geodataLayerSchemeObjectNotation);
};
