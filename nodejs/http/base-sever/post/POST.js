
// const http=require('http');
// const fs=require('fs');

// const url=require('url');
// const querystring = require('querystring');
// //创建server
// const server=http.createServer((req,res)=>{
// 	// console.log(req.url)
// 	console.log('11',req.method)
	
// 	if(req.method.toUpperCase() === 'POST'){
// 		let body='';
// 		req.on('data',(chunk)=>{
// 			body+=chunk;
// 		})
// 		req.on('end',()=>{
// 			// 查询字符串 str 解析成一个键值对的集合
// 			let obj=querystring.parse(body)
// 			console.log(obj)	
// 		})
// 		res.setHeader('Content-Type','text/html;charset=UTF-8');
// 		res.end('<h1>hello,你好</h1>')
// 	}else{
// 			const myURL = new url.parse(req.url,true);
// 			console.log(myURL.query)
// 			res.setHeader('Content-Type','text/html;charset=UTF-8');
// 			res.end('<h1>hello,你好</h1>')
// 	}

// })
// //开启HTTP服务器监听连接。
// server.listen(3000,'127.0.0.1',()=>{
// 	console.log('run to 127.0.0.a1')
// })







const http = require('http')
const url =require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{

	// console.log(req.url);
console.log('1::',req.method);
	
	if(req.method=='POST'){//处理POST请求
		let body=''
		req.on('data',(chunk)=>{
			body+=chunk;
		})

		req.on('end',()=>{
			// console.log(body);
			const myURL = querystring.parse(body);
			console.log('2::',myURL);
		})

		res.setHeader('Content-Type','text/html;charset=UTF-8');
		res.write('<h1>OK</h1>');
		res.end();
	}else{//处理GET请求
		const myURL = new url.parse(req.url,true);
		console.log('3::',myURL.query);
		// console.log(myURL);


		res.setHeader('Content-Type','text/html;charset=UTF-8');
		res.write('ok');
		res.end();
	}
	
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in the 127.0.0.1:3000');
})