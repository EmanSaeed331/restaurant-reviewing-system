// Initializes the `menu` service on path `/menu`
const { Menu } = require('./menu.class');
const createModel = require('../../models/menu.model');
const hooks = require('./menu.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/menu', new Menu(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('menu');

  service.hooks(hooks);
};
