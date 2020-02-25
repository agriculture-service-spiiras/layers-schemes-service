const { Service } = require('feathers-objection');

exports.GeodataLayerSchemes = class GeodataLayerSchemes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }

  async remove(id, params) {
    return await this.Model.transaction(async trx => {
      const scheme = await this.Model.query(trx).findById(id);
      await scheme.$relatedQuery('childLayers', trx).delete();
      await scheme.$relatedQuery('objects', trx).delete();
      await scheme.$relatedQuery('services', trx).unrelate();
      return await super.remove(id, {
        ...params,
        transaction: trx,
      });
    });
  }
};
