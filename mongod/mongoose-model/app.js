const mongoose = require('mongoose');
const Usermodel=require('./models/user.js');
const Boke=require('./models/boke.js')
let name=["tom","Amiy","chuntian","xiatian","qiutian","dongtian","yangyang","guangguang"];
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
//操作的过程中有`1错误怎么办
db.on('error', (err)=>{
	throw err
})
//链接成功 所有的操作都在以下回掉函数中操作
db.once('open', function() {
  	console.log('DB connected success')
//根据条件查询不重复的种类
	Usermodel.distinct("name",{},(err,result)=>{
		if(!err){
			console.log(result)
		}else{
			console.log(err)
		}
	})
	
});
