const { Service } = require('feathers-objection');

exports.GeodataLayerSchemeObjectNotation = class GeodataLayerSchemeObjectNotation extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
