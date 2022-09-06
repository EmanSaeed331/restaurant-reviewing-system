// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app} = context;


    var {TopPositiveReviews,TopNegativeReviews }= context.params; 


    if (context.params.rate == TopNegativeReviews)  
    {
      context.result = await app.service('reviews').Model.aggregate().match({'rate':-5});

    }
    else if (context.params.rate == TopPositiveReviews )  
    {
      context.result = await app.service('reviews').Model.aggregate().match({'rate':5});

    }
    else {
      context.result = await app.service('reviews').Model.aggregate().match({'rate':0});

    }
      
    return {...context};
  };
};
