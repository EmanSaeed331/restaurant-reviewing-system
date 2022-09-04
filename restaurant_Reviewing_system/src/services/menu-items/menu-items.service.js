// Initializes the `menuItems` service on path `/menu-items`
const { MenuItems } = require('./menu-items.class');
const createModel = require('../../models/menu-items.model');
const hooks = require('./menu-items.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/menu-items', new MenuItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('menu-items');

  service.hooks(hooks);
};
