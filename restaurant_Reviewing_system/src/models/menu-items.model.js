// menuItems-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html

const { default: mongoose } = require('mongoose');

// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'menuItems';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , required: true , ref:'users' },
    meals:  [ {type:mongoose.Schema.Types.ObjectId ,ref:'meal'}]
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
