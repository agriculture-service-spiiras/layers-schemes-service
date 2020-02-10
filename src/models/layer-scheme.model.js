// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class LayerScheme extends Model {
  static get tableName() {
    return 'geodata_layer_schemes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        parentId: { type: ['integer', 'null'] },
      },
    };
  }

  static get relationMappings() {
    const SchemeObject = require('./layer-scheme-object-notation.model')();
    const SchemeService = require('./layer-scheme-service.model')();

    return {
      objects: {
        relation: Model.HasManyRelation,
        modelClass: SchemeObject,
        join: {
          from: 'geodata_layer_schemes.id',
          to: 'geodata_layer_scheme_object_notation.schemeId',
        },
      },

      services: {
        relation: Model.ManyToManyRelation,
        modelClass: SchemeService,
        join: {
          from: 'geodata_layer_schemes.id',
          through: {
            from: 'geodata_layer_scheme_associated_services.schemeId',
            to: 'geodata_layer_scheme_associated_services.serviceId',
            extra: ['serviceOptions'],
          },
          to: 'geodata_layer_scheme_services.id',
        },
      },

      childLayers: {
        relation: Model.HasManyRelation,
        modelClass: LayerScheme,
        join: {
          from: 'geodata_layer_schemes.id',
          to: 'geodata_layer_schemes.parentId',
        },
      },

      parentLayer: {
        relation: Model.BelongsToOneRelation,
        modelClass: LayerScheme,
        join: {
          from: 'geodata_layer_schemes.parentId',
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
    const db = app.get('knex'); // eslint-disable-line no-console

    db.schema
      .hasTable('geodata_layer_scheme_associated_services')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('geodata_layer_scheme_associated_services', table => {
              table.increments('id');
              table.integer('schemeId');
              table.integer('serviceId');
              table.json('serviceOptions');
            })
            .then(() => console.log('Created geodata_layer_scheme_associated_services table')) // eslint-disable-line no-console
            .catch(e =>
              console.error('Error creating geodata_layer_scheme_associated_services table', e),
            ); // eslint-disable-line no-console
        }
      })
      .catch(e =>
        console.error('Error creating geodata_layer_scheme_associated_services table', e),
      ); // eslint-disable-line no-console

    db.schema
      .hasTable('geodata_layer_schemes')
      .then(exists => {
        if (!exists) {
          db.schema
            .createTable('geodata_layer_schemes', table => {
              table.increments('id');
              table.string('name');
              table.integer('parentId');
              table.timestamp('createdAt');
              table.timestamp('updatedAt');
            })
            .then(() => console.log('Created geodata_layer_schemes table')) // eslint-disable-line no-console
            .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console
        }
      })
      .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console
  }

  return LayerScheme;
};
