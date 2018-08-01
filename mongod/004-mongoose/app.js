const mongoose = require('mongoose');
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
	const User = mongoose.model('User', UserSchema);
	//4用model操作数据库 1，new 一个对象
	/*
	//插入
	const user = new User({ name: 'tom',age:18,sex:"male"});
	//4存储操作为异步操作
	user.save((err,doc)=>{
		if(!err){
			console.log(doc.toString())
		}else{
			console.log(err)
		}
	})
	*/
	/*
	//查找
	User.find({name:"tom"},(err,doc)=>{
		if(!err){
			//打印数组
			console.log(doc.toString())
		}else{
			console.log("not find",err)
		}
	})
	*/
	/*
	//修改
	User.update({name:"tom"},{$set:{age:99}},{multi:true},(err,doc)=>{
		if(!err){
			console.log(doc)
		}else{
			console.log("uodata file",err)
		}
	})
	*/
	//删除
	User.remove({_id :"5b61a1665ef8d2d30af42e43"},(err,doc)=>{
		if(!err){
			console.log(doc)
		}else{
			console.log("remove file",err)
		}
	})
});

