// const fs=require('fs');
// const path=require('path');
// const http=require('http');
// const mime=require('./mime.json');

// const server=http.createServer((req,res)=>{
// 	let fileName=req.url;
// 	if(fileName.lastIndexOf('.')==-1){
// 		fileName=fileName+'/index.html';
// 		// console.log(fileName);

// 	}
// 	let filePath=path.normalize(__dirname+fileName);
// 	let fileExtName=path.extname(filePath);
// 	// console.log(fileExtName);
// 	// let filePath=mimefileExtName
// 	fs.readFile(filePath,(err,data)=>{
// 		if(!err){
// 			res.setHeader('Content-Type',mime[fileExtName]+';charset=UTF-8');
// 			res.end(data);
// 		}else{
// 			res.setHeader('Content-Type','text/html;charset=UTF-8');
// 			res.StatusCode=404;
// 			res.end('页面失踪了。。。')
// 		}
// 	})
	
	
// })

// server.listen(3000,'127.0.0.1',()=>{
// 	console.log('server is running in the 127.0.0.1:3000');
// })



const http=require('http');
const path=require('path');
const fs=require('fs');
const mime=require('./mime.json')
const server=http.createServer((req,res)=>{
	// console.log(req.url)
	let fileName=req.url;
	//如果用户请求的是文件夹的话，就返回请求文件夹下面的index。html
	if(fileName.lastIndexOf('.')==-1){
		fileName=fileName+'/index.html'
		console.log('1::',fileName)
	}
	//设置路径path
	let filePath=path.normalize(__dirname+fileName);
	console.log('2::',filePath);
	//头部的扩展名
	let fileExtName=path.extname(filePath)
	console.log('3::',fileExtName)
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let mimeType=mime[fileExtName]||'text/plain';
			console.log('4:::',mimeType)
			res.setHeader('Content-Type',mimeType+';charset=UTF-8');
			res.end(data)
		}else{
			res.setHeader('Content-Type','text/html;charset=UTF-8');
			res.StatusCode=404;
			res.end('页面失踪了。。。')
		}
	})
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in the 127.0.0.1:3000')
})