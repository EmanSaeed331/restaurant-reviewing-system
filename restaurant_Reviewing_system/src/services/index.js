const users = require('./users/users.service.js');
const menu = require('./menu/menu.service.js');
const meal = require('./meal/meal.service.js');
const menuItems = require('./menu-items/menu-items.service.js');
const admin = require('./admin/admin.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(menu);
  app.configure(meal);
  app.configure(menuItems);
  app.configure(admin);
};
