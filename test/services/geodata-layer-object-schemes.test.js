const app = require('../../src/app');

describe("'GeodataLayerObjectSchemes' service", () => {
  it('registered the service', () => {
    const service = app.service('objects');
    expect(service).toBeTruthy();
  });
});
