const mongoose = require('mongoose');
    const BokeSchema = new mongoose.Schema({

    color:{
      type:String

    },  

    content:{
      type:String
    }
  });
  const BokeModel = mongoose.model('Wish', BokeSchema);
  module.exports=BokeModel;