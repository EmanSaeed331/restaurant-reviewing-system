// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const cron = require('node-cron');
var topPositiveRev ;
var topNegativeRev;
var transporter = nodemailer.createTransport(
  sendgridTransport({
    auth:{
      api_key:process.env.SENDGRID,
        
    }
  })
);
const sendEmail= () => {

  return async context => {

    const topPositive= await context.app.service('reviews').Model.aggregate().match({'rate':5});
    context.result.topPositiveReviews = topPositive;
    context.result.countOfPositiveReviews = topPositive.length;

    const topNegative= await context.app.service('reviews').Model.aggregate().match({'rate':-5});
    context.result.topNegativeReviews = topNegative;
    context.result.countOfNegativeReviews = topNegative.length;

    topPositiveRev = topPositive.length;
    topNegativeRev = topNegative.length;

 
  
    return { context } ;
  };
};

//  Cron Job 
async function sendingReviewingEmail () {
  cron.schedule('* */12 * * *',  async () => {
    let ans = await sendEmail();
    console.log('CRNE JOB IS RUNNNG' + ans );
    await transporter.sendMail({
      from:'es9557403@gmail.com',
      to:'emansaeed5330@gmail.com',
      subject:' ⚡ Reviews of your restaurant ⚡' ,
      text:`<h1 top positive reviews >  ${topPositiveRev}`,
      html: `<p>  🟩 top positive reviews  ${topPositiveRev}</p>
             <p>  🟥 top negative reviews  ${topNegativeRev}</p>`,
    });
  
  });
} 
module.exports = sendingReviewingEmail;