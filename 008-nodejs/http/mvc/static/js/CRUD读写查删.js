const fs=require('fs');
//路径
const filePath='./test.json';
const uuidv1 = require('uuid/v1');
//增
/*
let add=(name,callback)=>{
	//步骤1，readfile  2，data数据为buffer然后把它转化为数组  3，把转化的数组push进去 4，把push的数组写到文件里
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			// console.log(data)
			let obj=JSON.parse(data)
			// console.log(obj);
			obj.push({
				id:uuidv1(),
				name:name
			})
			// console.log(obj)
			//方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
			let str = JSON.stringify(obj);
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					callback(null,obj)
				}else{
					callback(err);
				}
			})
		}else{
			callback(err);
		}
	})
}
add('mike',(err,data)=>{
	if(!err){
		
		if(data){
			console.log(data)
		}else{
			console.log('not found');
		}
	}else{
		console.log('get data error:::',err);
	}
	
})
*/


// let get=(id,callback)=>{
// 	fs.readFile(filePath,(err,data)=>{
// 		if(!err){
// 			// console.log(data.toString())
// 			let obj=JSON.parse(data);
// 			// console.log(obj)
// 			//定义一个结果为空
// 			let result = null;
// 			//如果传进去的ID=JSON数组里面的ID就把ID赋给result


// 			obj.some((obj)=>{
// 				if(obj['id'] == id){
// 					result = obj;
// 					return true;
// 				}
								
// 			})



// 			callback(null,result)
// 		}else{
// 			callback(err)
// 		}
		
// 	});
// }
// get( '20611dd0-9002-11e8-8022-b9f16f878da4',(err,data)=>{
// 	if(!err){
// 		if(data){
// 			console.log(data)
// 		}else{
// 			console.log('not font flie')
// 		}
// 	}else{
// 		console.log('get file fail')
// 	}
// })

// let updata=(id,name,callback)=>{
// 	fs.readFile(filePath,(err,data)=>{
// 		if(!err){
// 			let obj=JSON.parse(data);
// 			obj.some((obj)=>{
// 				if(obj['id']==id){
// 					obj['name']=name;
// 					return true;
// 				}
// 			})
// 			let str = JSON.stringify(obj);
			
// 			fs.writeFile(filePath,str,(err)=>{
// 				if(!err){
// 					callback(null,obj)
// 				}else{
// 					callback(err)
// 				}
// 			})
// 		}else{
// 			callback(err)
// 		}
// 	})
// }
// updata( '2a287930-9002-11e8-86a7-f36274f4229e','mimi',(err,data)=>{
// 	if(!err){
// 		if(data){
// 			console.log(data)
// 		}else{
// 			console.log('not font flie')
// 		}
// 	}else{
// 		console.log('updata file fail')
// 	}
// })


let remove=(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);

			let NewObj=obj.filter((obj)=>{
				return obj['id']!=id
			})
			let str = JSON.stringify(NewObj);
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					callback(null,NewObj)
				}else{
					callback(err)
				}
			})
		}else{
			callback(err)
		}
	})
}
remove('2a287930-9002-11e8-86a7-f36274f4229e',(err,data)=>{
	if(!err){
		if(data){
			console.log(data)
		}else{
			console.log('not font flie')
		}
	}else{
		console.log('delete file fail')
	}
})






/*
add(1,'tom',(err,data)=>{
	if(!arr){
		console.log('add sucess')
		console.log(data);
	}else{
		console.log('add fail')
	}
})

let get =(id,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj=JSON.parse(data);//json转数组
			
			let result=null;
			obj.some((val)=>{
				if(val['id']==id){
					val['name']=name;
					return false
				}
			})
		}else{
			callback(err)
		}
	})
}
get('tom',()=>{

})
*/



