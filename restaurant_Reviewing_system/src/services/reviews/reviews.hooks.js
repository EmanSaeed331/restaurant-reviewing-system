const { authenticate } = require('@feathersjs/authentication').hooks;
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;

const review = require('../../hooks/review');


const reveiwsCount = require('../../hooks/reveiws_count');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [redisBefore()],
    create: [review()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [cache({duration: 3600 * 12}), redisAfter(), reveiwsCount()],
    get: [cache({duration: 3600 * 12}), redisAfter()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
