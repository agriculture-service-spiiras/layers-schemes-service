const app = require('../../src/app');

describe("'GeodataLayerSchemes' service", () => {
  it('registered the service', () => {
    const service = app.service('schemes');
    expect(service).toBeTruthy();
  });

  // TODO: Завести базу данных для тестирования

  // it('create new simple scheme', async () => {
  //   const service = app.service('schemes');
  //   const created = await service.create({
  //     name: 'test_scheme',
  //   });
  //   expect(created).toHaveProperty('id');
  //   if (created.id) {
  //     service.remove(created.id);
  //   }
  // });

  // it('create new scheme without name field aborted', async () => {
  //   const service = app.service('schemes');
  //   const created = await service.create({});
  //   expect(created).toThrow();
  //   if (created.id) {
  //     service.remove(created.id);
  //   }
  // });
});
