// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const logger = require('../logger');

module.exports = (options = {}) => {
  return async context => {
    const { app } = context;

    var date =  new Date(Date.now()).toLocaleString();
    logger.info('User Login' ,{date});

    return context;
  };
};
