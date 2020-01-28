const { Service } = require('feathers-objection');

exports.GeodataLayerSchemeServices = class GeodataLayerSchemeServices extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
