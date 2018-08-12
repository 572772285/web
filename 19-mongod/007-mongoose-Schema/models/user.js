const mongoose = require('mongoose');
//在Schema定义的数据类型在插入的时候要注意，按照类型，否则会出错
  	const UserSchema = new mongoose.Schema({
	  name: {
	  	type:String
	  },
	  age:{
	  	type:Number,
	  	//default是默认值，如果在插入的时候不写也会按照默认值插入
	  	default:10
	  },
	  sex:{
	  	type:String,
	  	//enum是枚举类型，只能取定义范围的值，其他的一概不行
	  	enum:["man","woman"]
	  },
	  locked:{
	  	type:Boolean
	  },
	  createdAt:{
	  	type:Date,
	  	default:Date.now
	  },
	  friends:{
	  	type:Array
	  }
	});
	const UserModel = mongoose.model('User', UserSchema);
	module.exports=UserModel