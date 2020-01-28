const app = require('../../src/app');

describe("'GeodataLayerSchemeServices' service", () => {
  it('registered the service', () => {
    const service = app.service('services');
    expect(service).toBeTruthy();
  });
});
