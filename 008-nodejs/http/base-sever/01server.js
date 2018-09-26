const http=require('http')
//创建server
const fs=require('fs');
const server=http.createServer((req,res)=>{

	let pathName=req.url;
	console.log(pathName)
	if(pathName=='/index.html'){
		fs.readFile('./index.html',(err,data)=>{
			if(!err){
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(data)
			}else{
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.StatusCode=404;
				res.end('<h1>请求出错了</h1>')
			}
		})
	}else if(pathName=='/list.html'){
		fs.readFile('./list.html',(err,data)=>{
			if(!err){
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(data)
			}else{
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.StatusCode=404;
				res.end('<h1>请求出错了</h1>')
			}
		})
	}else if(pathName=='/index.js'){
		fs.readFile('./index.js',(err,data)=>{
			if(!err){
				res.setHeader('Content-Type','application/x-javascript;charset=UTF-8');
				res.end(data)
			}else{
				res.setHeader('Content-Type','application/x-javascript;charset=UTF-8');
				res.StatusCode=404;
				res.end('<h1>请求出错了</h1>')
			}
		})		
	}else if(pathName=='/index.css'){
		fs.readFile('./index.css',(err,data)=>{
			if(!err){
				res.setHeader('Content-Type','text/css;charset=UTF-8');
				res.end(data)
			}else{
				res.setHeader('Content-Type','text/css;charset=UTF-8');
				res.StatusCode=404;
				res.end('<h1>请求出错了</h1>')
			}
		})			
	}else{
		res.setHeader('Content-Type','application/x-javascript;charset=UTF-8');
		res.StatusCode=404;		
		res.end('<h1>页面找不到</h1>')
	}
})
// readFile()
//开启HTTP服务器监听连接。
server.listen(3000,'127.0.0.1',()=>{
	console.log('run to 127.0.0.1')
})