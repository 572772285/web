const http=require('http');

const server = http.createServer((req,res)=>{
res.setHeader('Access-Control-Allow-Origin','*');
	let data=['i love study','i love you']
	res.end(JSON.stringify(data))
})
server.listen(3001,'127.0.0.1',()=>{
	console.log('running')
})