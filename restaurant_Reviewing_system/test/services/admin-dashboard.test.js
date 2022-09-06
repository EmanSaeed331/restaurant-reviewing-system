const assert = require('assert');
const app = require('../../src/app');

describe('\'admin-dashboard\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin-dashboard');

    assert.ok(service, 'Registered the service');
  });
});
