const mongoose = require('mongoose');
    const WishSchema = new mongoose.Schema({

    color:{
      type:String

    },  

    content:{
      type:String
    }
  });
  const WishModel = mongoose.model('Wish', WishSchema);
  module.exports=WishModel;