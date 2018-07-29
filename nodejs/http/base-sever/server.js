const http=require('http')
//创建server
const server=http.createServer((req,res)=>{
	//请求头设置返回类型
	res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.write('<h1>hello,你好</h1>');
	res.end()
})
//开启HTTP服务器监听连接。
server.listen(3000,'127.0.0.1',()=>{
	console.log('run to 127.0.0.1')
})