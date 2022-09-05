// reviews-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { default: mongoose } = require('mongoose');

module.exports = function (app) {
  const modelName = 'reviews';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    text: { type: String, required: true },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'users'
    },
    rate: { type:Number , enum:[-5,0,5], required:true},
    comment:{type:String  },
    image:{  data: Buffer,contentType: String } ,
    mealId:{type:mongoose.Schema.Types.ObjectId , required:true , ref:'meal'}, 
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};

/*

  reviews:[
      {
        userID:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:'users'
        },
        rate: { type:Number , enum:[-5,0,5], required:true},
        comment:{type:String  },
        image:{  data: Buffer,contentType: String }
      }
    ]*/ 