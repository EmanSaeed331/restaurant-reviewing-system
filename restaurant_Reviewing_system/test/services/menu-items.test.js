const assert = require('assert');
const app = require('../../src/app');

describe('\'menuItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('menu-items');

    assert.ok(service, 'Registered the service');
  });
});
