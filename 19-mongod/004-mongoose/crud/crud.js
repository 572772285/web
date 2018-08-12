const mongoose = require('mongoose');

let name=["tom","Amiy","chuntian","xiatian","qiutian","dongtian","yangyang","guangguang"]
let sex=["man","woman"];
let getRandom = (min,max)=> {	
	return Math.round(min + (max-min)*Math.random());
}
let getname=()=>{
	return name[getRandom(0,name.length-1)]
}
let getSex=()=>{
	return sex[getRandom(0,sex.length-1)]
}



//需要指定端口号  	//1.链接数据库
mongoose.connect('mongodb://localhost:27017/yang',{ useNewUrlParser: true });
const db = mongoose.connection;
//操作的过程中有错误怎么办
db.on('error', (err)=>{
	throw err
	
})
//链接成功 所有的操作都在以下回掉函数中操作
db.once('open', function() {
  	console.log('DB connected success')
  	//2定义UserSchema
  	const UserSchema = new mongoose.Schema({
	  name: String,
	  age:Number,
	  sex:String
	});
	//3用定义好的Schema生成模型 
	//注意，model的第一个参数回生成数据库的集合
	const Usermodel = mongoose.model('User', UserSchema);
	/*
	//插入方法一
	Usermodel.insertMany([{name:"tom",age:18,sex:"man"},{name:"leo",age:12,sex:"woman"}],(err,doc)=>{
		if(!err){
			console.log(doc)
		}else{
			console.log(err)
		}
	})
	*/
	/*
	//插入方法二
	let promise=Usermodel.insertMany([{name:"tom",age:18,sex:"man"},{name:"leo",age:12,sex:"woman"}]);
	promise
	.then((docs)=>{
		console.log(docs)
	})
	.cach((err)=>{
		console.log(err)
	})
	*/
	/*
	//插入方法三
	Usermodel.create({name:"asd",age:22,sex:"woman"},{name:"asda",age:21,sex:"woman"},(err,doc)=>{
		if(!err){
			console.log(doc)
		}else{
			console.log(err)
		}
	})

	*/

	// for(var i=0;i<10;i++){
	// 		Usermodel.insertMany({name:getname(),age:getRandom(5,80),sex:getSex()},(err,doc)=>{
	// 			if(!err){
	// 				console.log(doc)
	// 			}else{
	// 				console.log(err)
	// 			}
	// 		})
	// }
	//查找方法
	/*
	Usermodel.findById("5b61a1675ef8d2d30af42e44",(err,doc)=>{
		if(!err){
			//需要把ID转为字符串，否则为对象
			console.log(doc._id.toString());
		}else{
			console.log(err)
		}
	})
	
	*/
	// Usermodel.findOne({name:"tom"},(err,doc)=>{
	// 	if(!err){
	// 		console.log(doc);
	// 	}else{
	// 		console.log(err)
	// 	}
	// })
	// Usermodel.find({age:{$gt:18},sex:"woman"},(err,doc)=>{
	// 	if(!err){
	// 		console.log(doc)
	// 	}else{
	// 		console.log(err)
	// 	}
	// })

	//更新方法
	// Usermodel.updateOne({age:{$gt:18}},{age:22},{ multi: true },(err,doc)=>{
	// 	if(!err){
	// 		console.log(doc)
	// 	}else{
	// 		console.log(err)
	// 	}
	// })
 	
 	//删除方法
 	Usermodel.remove({name:"xiatian"},(err,doc)=>{
 		if(!err){
			console.log(doc)
		}else{
			console.log(err)
		}
 	})
/*
//根据条件查询不重复的种类
	Usermodel.distinct("name",{},(err,result)=>{
		if(!err){
			console.log(result)
		}else{
			console.log(err)
		}
	})
	*/
});
