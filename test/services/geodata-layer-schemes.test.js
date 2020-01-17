const app = require('../../src/app');

describe("'GeodataLayerSchemes' service", () => {
  it('registered the service', () => {
    const service = app.service('rest');
    expect(service).toBeTruthy();
  });
});
