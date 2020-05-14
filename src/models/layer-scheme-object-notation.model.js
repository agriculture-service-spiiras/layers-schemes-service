// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class LayerSchemeObjectNotation extends Model {
  static get tableName() {
    return 'geodata_layer_scheme_object_notation';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'dataSourceFeature', 'schemeId'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        dataSourceFeature: { type: 'string' },
        schemeId: { type: 'integer' },
        objectFormat: {
          type: 'object',
        },
      },
    };
  }

  static get relationMappings() {
    const Scheme = require('./layer-scheme.model')();

    return {
      scheme: {
        relation: Model.BelongsToOneRelation,
        modelClass: Scheme,
        join: {
          from: 'geodata_layer_scheme_object_notation.schemeId',
          to: 'geodata_layer_schemes.id',
        },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function(app) {
  if (app) {
    const db = app.get('knex');

    db.schema
      .hasTable('geodata_layer_scheme_object_notation')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('geodata_layer_scheme_object_notation', table => {
              table.increments('id');
              table.string('name');
              table.string('dataSourceFeature');
              table.integer('schemeId');
              table.json('objectFormat');
              table.timestamp('createdAt');
              table.timestamp('updatedAt');
            })
            .then(() => console.log('Created geodata_layer_scheme_object_notation table')) // eslint-disable-line no-console
            .catch(e =>
              console.error('Error creating geodata_layer_scheme_object_notation table', e),
            ); // eslint-disable-line no-console
        }
      })
      .catch(e => console.error('Error creating geodata_layer_scheme_object_notation table', e)); // eslint-disable-line no-console
  }

  return LayerSchemeObjectNotation;
};
