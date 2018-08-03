const mongoose = require('mongoose');
const UserModel=require('./models/user.js');
const BokeModel=require('./models/boke.js');
const moment=require('moment');
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
  	console.log('DB connected success');

  	/*
  	UserModel.insertMany({name:"Tom",sex:"woman",locked:false,age:23,phone:"18837418915",
  		friends:["pengpeng","yangyang","kunkun","zhezhe","xinxin","xiangxiang"]},(err,doc)=>{
  			if(!err){
  				console.log(doc)
  			}else{
  				console.log(err.message)
  			}
  		})
	*/

	/*
	//找时间
	UserModel.findById("5b62e5c4b1d829114cfb67a0",(err,doc)=>{
		if(!err){
			// console.log(doc.createdAt)
			//想要拿到这个时间就要new一个时间对象，
			//把doc.createdAt传到里面，通过时间对象上的方法拿到年月日
			let NewDate=new Date(doc.createdAt);
			// console.log(NewDate.getFullYear()+'-'+(NewDate.getMonth()+1)+'-'+NewDate.getDate()+'-'+NewDate.getHours()+'-'+NewDate.getMinutes()+'-'+NewDate.getSeconds())
			//fomat()里面传参数YYYY-MM-DD年月日 HH24小时制 
			//moment插件
			console.log(moment(doc.createdAt).format('YYYY-MM-DD HH:mm:ss'))
		}else{
			console.log(err)
		}
	})
	*/


	/*
	//boke发表文章
	//这是一个一对多的关系，一个作者可以发布多篇文章
	BokeModel.insertMany({author:"5b63167f635dd826f023d8e1",
		title:"我今天交了一个女朋友，好开心"
},(err,doc)=>{
	if(!err){
		console.log(doc)
	}else{
		console.log(err)
	}
})
*/

/*
//正常方法通过作者名字上的doc._id找到这个作者发表的文章
UserModel.findOne({name:"Tom"},(err,doc)=>{
	BokeModel.find({author:doc._id},(err,doc)=>{
		console.log(doc)
	})
})
*/

/*
//自定义找作者文章方法
UserModel.findOne({name:"Tom"},(err,doc)=>{
	doc.findMyBokes((err,docs)=>{
		console.log(docs)
	})
})
*/

//自定义通过电话号码找到作者

UserModel.findByPhone('18837418915',(err,doc)=>{
	if(!err){
		console.log(doc)
	}else{
		console.log(err)
	}
})



  	/*
//根据条件查询不重复的种类
	UserModel.distinct("name",{},(err,result)=>{
		if(!err){
			console.log(result)
		}else{
			console.log(err)
		}
	})
	*/
});
