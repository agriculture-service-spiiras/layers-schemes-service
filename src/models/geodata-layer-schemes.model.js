// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class geodataLayerSchemes extends Model {
  static get tableName() {
    return 'geodata_layer_schemes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' },
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
    .hasTable('geodata_layer_schemes')
    .then(exists => {
      if (!exists) {
        db.schema
          .createTable('geodata_layer_schemes', table => {
            table.increments('id');
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created geodata_layer_schemes table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console
      }
    })
    .catch(e => console.error('Error creating geodata_layer_schemes table', e)); // eslint-disable-line no-console

  return geodataLayerSchemes;
};
