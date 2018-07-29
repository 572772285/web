const http=require('http')
// const fs=require('fs')
const url=require('url')
const querystring = require('querystring');
//创建server
const server=http.createServer((req,res)=>{
	//请求头设置返回类型
	const myURL = new url.parse(req.url,true);
	console.log(myURL.query)
	res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.end('<h1>hello,你好</h1>')
})
//开启HTTP服务器监听连接。
server.listen(3000,'127.0.0.1',()=>{
	console.log('run to 127.0.0.1')
})