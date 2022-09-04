const assert = require('assert');
const app = require('../../src/app');

describe('\'menu\' service', () => {
  it('registered the service', () => {
    const service = app.service('menu');

    assert.ok(service, 'Registered the service');
  });
});
