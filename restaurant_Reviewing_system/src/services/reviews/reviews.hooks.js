const { authenticate } = require('@feathersjs/authentication').hooks;
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;

const review = require('../../hooks/review');
const reveiwsCount = require('../../hooks/reveiws_count');
const dauria = require('dauria');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [redisBefore()],
    create: [review() ,  function(context) {
      if (!context.data.uri && context.params.file){
        const file = context.params.file;
        const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
        context.data = {uri: uri};
      }
    } ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      cache({duration: 3600 * 12}),
      redisAfter(),
      reveiwsCount(),
    ],
    get: [cache({duration: 3600 * 12}), redisAfter()],
    create: [review()],
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
