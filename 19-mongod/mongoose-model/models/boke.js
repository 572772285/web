const mongoose = require('mongoose');
  	const BokeSchema = new mongoose.Schema({
	  author: String,
	  title:String,
	  content:String
	});
	const Boke = mongoose.model('Boke', BokeSchema);
	module.exports=BokeSchema;