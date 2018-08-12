const mongoose = require('mongoose');
  	const BokeSchema = new mongoose.Schema({
	  author:{
	  	type:mongoose.Schema.Types.ObjectId,
	  	//如果用关联查询了,后面Usr是条件回到user集合里面去关联
	  	ref:'User'
	  },
	  title:{
	  	type:String

	  },	

	  content:{
	  	type:String
	  }
	});

  	/*
  	//自定义通过文章题目关联作者
	BokeSchema.statics.findBoke=function(query={},callbak){
		this
		.findOne({title:"im title"})
		.populate("author")
		.then((doc)=>{
			callbak(doc)
		})
	}
	*/
	BokeSchema.statics.findBoke=function(query={}){
		let promise=new Promise((resolve,reject)=>{
			this
			.findOne({title:"im title"})
			.populate("author")
			.then((doc)=>{
				resolve(doc)
			})
			.catch((err)=>{
				reject(err)
			})
		})
		return promise
	}
	const BokeModel = mongoose.model('Boke', BokeSchema);
	module.exports=BokeModel;