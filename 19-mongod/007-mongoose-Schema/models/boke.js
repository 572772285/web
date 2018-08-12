const mongoose = require('mongoose');
  	const BokeSchema = new mongoose.Schema({
	  author:{
	  	type:mongoose.Schema.Types.ObjectId
	  },
	  title:{
	  	type:String
	  },	

	  content:{
	  	type:String
	  }
	});
	const BokeModel = mongoose.model('Boke', BokeSchema);
	module.exports=BokeModel;