// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class LayerSchemeService extends Model {
  static get tableName() {
    return 'geodata_layer_scheme_services';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
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
  const db = app.get('knex');

  db.schema
    .hasTable('geodata_layer_scheme_services')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('geodata_layer_scheme_services', table => {
            table.increments('id');
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created geodata_layer_scheme_services table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating geodata_layer_scheme_services table', e)); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating geodata_layer_scheme_services table', e)); // eslint-disable-line no-console

  return LayerSchemeService;
};
