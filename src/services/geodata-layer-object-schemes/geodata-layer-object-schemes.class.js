const { Service } = require('feathers-objection');

exports.GeodataLayerObjectSchemes = class GeodataLayerObjectSchemes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
