const geodataLayerSchemes = require('./geodata-layer-schemes/geodata-layer-schemes.service.js');
// eslint-disable-next-line no-unused-vars

module.exports = function(app) {
  app.configure(geodataLayerSchemes);
};
