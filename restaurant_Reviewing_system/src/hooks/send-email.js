// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


module.exports = (options = {}) => {

  return async context => {

    const topPositive= await context.app.service('reviews').Model.aggregate().match({'rate':5});
    context.result.topPositiveReviews = topPositive;
    context.result.countOfPositiveReviews = topPositive.length;

    const topNegative= await context.app.service('reviews').Model.aggregate().match({'rate':-5});
    context.result.topNegativeReviews = topNegative;
    context.result.countOfNegativeReviews = topNegative.length;

    let topPositiveRev = topPositive.length;
    let topNegativeRev = topNegative.length;

    let transporter = nodemailer.createTransport(
      sendgridTransport({
        auth:{
          api_key:process.env.SENDGRID,
            
        }
      })
    );
   
    context.result= await transporter.sendMail({
      from:'es9557403@gmail.com',
      to:'emansaeed5330@gmail.com',
      subject:' ⚡ Reviews of your restaurant ⚡' ,
      text:`<h1 top positive reviews >  ${topPositiveRev}`,
      topPositiveReviews:topPositive , 
      countOfPositiveReviews:topPositive.length,
      topNegativeReviews:topNegative,
      countOfNegativeReviews:topNegative.length,
      html: `<p>  🟩 top positive reviews   ${topPositiveRev}</p>
             <p>  🟥 top negative reviews   ${topNegativeRev}</p>`,
     

    });
    return context;
  };
};
