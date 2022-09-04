// Initializes the `meal` service on path `/meal`
const { Meal } = require('./meal.class');
const createModel = require('../../models/meal.model');
const hooks = require('./meal.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/meal', new Meal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('meal');

  service.hooks(hooks);
};
