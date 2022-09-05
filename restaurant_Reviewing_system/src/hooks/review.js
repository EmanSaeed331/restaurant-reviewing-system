// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // data is the data that the client send to the server 
    /* const { data } = context ;  */
    
    const { user } = context.params;
    const { mealId } = context.params.query;

    context.data = {
      userId:user._id,
      mealId,
      ...context.data,

    };
     
    return context;
  };
};
