const mongoose = require('mongoose');
//在Schema定义的数据类型在插入的时候要注意，按照类型，否则会出错
  	const UserSchema = new mongoose.Schema({
	  name: {
	  	type:String,
	  	//必须条件
	  	required:[true,"用户名必须输入"],
	  	//最大字符和最小字符
	  	maxlength:[10,"最大10个字符"],
	  	minlength:[2,"最小2个字符"]
	  },
	  phone:{
	  	type:String,
	  	validate:{
	  		validator:function(val){
	  			return /1[358]\d{9}/.test(val)
	  		},
	  		message:"{VALUE} 不是合法电话号码"
	  	}
	  },
	  age:{
	  	type:Number,
	  	//default是默认值，如果在插入的时候不写也会按照默认值插入
	  	default:10,
	  	//最大年龄和最小年龄
	  	max:[150,"最大年龄150岁"],
	  	min:[1,"最小年龄为1岁"]
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
	//在userSchema上存一个静态方法
	UserSchema.methods.findMyBokes=function(callback){
		//通过model方法传boke进去找到boke对象
		// console.log(this.model('Boke'))
		this.model('Boke').find({author:this._id},(err,doc)=>{
			callback(err,doc)
		})
	}
	const UserModel = mongoose.model('User', UserSchema);
	module.exports=UserModel