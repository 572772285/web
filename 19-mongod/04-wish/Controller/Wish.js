
const swig = require('swig');
const querystring=require('querystring');
const BokeModel=require('../Model/Wish.js')
class Wish{

	//显示许愿墙页面
	index(req,res,...args){
		/*
		wish.get((err,data)=>{
			if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}
			
		});	
		*/
		BokeModel.find({},(err,data)=>{
			if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}			
		})
		
	}

	del(req,res,...args){
		/*
		wish.remove(args[0],(err)=>{
			if(!err){
				let resultJson = JSON.stringify({
					status:0
				});
				res.end(resultJson);					
			}
		});
		*/
		BokeModel.remove({_id:args[0]},(err,doc)=>{
			if(!err){
				let resultJson = JSON.stringify({
					status:0
				});
				res.end(resultJson);					
			}
		})
	}
	
	add(req,res,...args){
		//1.获取前端的参数
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		});
		req.on('end',()=>{
			//把字符串转化为对象
			let obj = querystring.parse(body);
			console.log('body::::',body)
			/*
			//2.存储到文件
			wish.add(obj,(err,data)=>{
				let result = {};
				if(!err){
					//3.返回结果到前端
					result = {
						status:0,//成功
						data:data
					}
				}else{
					result = {
						status:10,//成功
						message:'添加失败'
					}
					console.log(err);
				}
				let resultJson = JSON.stringify(result);
				res.end(resultJson);				
			});
			*/
			BokeModel.insertMany(obj,(err,doc)=>{
				console.log('doc::::',doc)
				let result = {};
				if(!err){
					//3.返回结果到前端
					result = {
						status:0,//成功
						data:doc[0]
					}
				}else{
					result = {
						status:10,//成功
						message:'添加失败'
					}
					console.log(err);
				}
				let resultJson = JSON.stringify(result);
				res.end(resultJson);
			})
		});
	}
}	

module.exports = new Wish();