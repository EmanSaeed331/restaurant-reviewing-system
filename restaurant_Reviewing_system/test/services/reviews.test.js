const assert = require('assert');
const app = require('../../src/app');

describe('\'reviews\' service', () => {
  it('registered the service', () => {
    const service = app.service('reviews');

    assert.ok(service, 'Registered the service');
  });
});
