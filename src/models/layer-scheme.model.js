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
    const SchemeObject = require('./layer-object-scheme.model');
    const SchemeService = require('./layer-scheme-service.model');

    return {
      objects: {
        relation: Model.ManyToManyRelation,
        modelClass: SchemeObject,
        join: {
          from: 'geodata_layer_schemes.id',
          through: {
            from: 'geodata_layer_scheme_associated_objects.schemeId',
            to: 'geodata_layer_scheme_associated_objects.objectId',
          },
          to: 'geodata_layer_object_schemes.id',
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
  const db = app.get('knex'); // eslint-disable-line no-console

  db.schema
    .hasTable('geodata_layer_scheme_associated_objects')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('geodata_layer_scheme_associated_objects', table => {
            table.increments('id');
            table
              .integer('schemeId')
              .unsigned()
              .notNullable();
            table
              .integer('objectId')
              .unsigned()
              .notNullable();
          })
          .then(() => console.log('Created geodata_layer_scheme_associated_objects table')) // eslint-disable-line no-console
          .catch(e =>
            console.error('Error creating geodata_layer_scheme_associated_objects table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating geodata_layer_scheme_associated_objects table', e));

  db.schema
    .hasTable('geodata_layer_scheme_associated_services')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('geodata_layer_scheme_associated_services', table => {
            table.increments('id');
            table
              .integer('schemeId')
              .unsigned()
              .notNullable();
            table
              .integer('serviceId')
              .unsigned()
              .notNullable();
          })
          .then(() => console.log('Created geodata_layer_scheme_associated_services table')) // eslint-disable-line no-console
          .catch(e =>
            console.error('Error creating geodata_layer_scheme_associated_services table', e),
          ); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating geodata_layer_scheme_associated_services table', e)); // eslint-disable-line no-console

  db.schema
    .hasTable('geodata_layer_schemes')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('geodata_layer_schemes', table => {
            table.increments('id');
            table.string('name');
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created geodata_layer_schemes table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console

  return LayerScheme;
};
