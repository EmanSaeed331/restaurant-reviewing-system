const assert = require('assert');
const app = require('../../src/app');

describe('\'audit\' service', () => {
  it('registered the service', () => {
    const service = app.service('audit');

    assert.ok(service, 'Registered the service');
  });
});
