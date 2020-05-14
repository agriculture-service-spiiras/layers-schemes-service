const { Service } = require('feathers-objection');

exports.GeodataLayerSchemes = class GeodataLayerSchemes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
