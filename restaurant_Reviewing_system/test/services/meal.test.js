const assert = require('assert');
const app = require('../../src/app');

describe('\'meal\' service', () => {
  it('registered the service', () => {
    const service = app.service('meal');

    assert.ok(service, 'Registered the service');
  });
});
