const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const url = require('url');
const querystring = require('querystring');
const swig = require('swig');

const server = http.createServer((req,res)=>{
	
	console.log("req.url:::",req.url);
	
	let pathname = url.parse(req.url,true).pathname;

	//约定: 
	//1.请求路径以 /static/开始的都是静态资源
	//           /static/css/index.css
	//2.路由的请求格式: /Controller/action/arg1/arg2.....
	//				 /Wish/index/

	if(pathname.startsWith('/static/')){//处理静态资源

		let filePath = path.normalize(__dirname + pathname);
		let fileExtName = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(!err){
				let mimeType = mime[fileExtName] || 'text/plain';
				res.setHeader('Content-Type', mimeType+';charset=UTF-8');
				res.end(data);
			}else{
				res.setHeader('Content-Type', 'text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<h1>页面走丢了。。。。</h1>')
			}
		});
	}else{//处理动态路由
		let paths = pathname.split('/');
		console.log('cccc:::',paths)
		let controller = paths[1] || 'Wish';
		let action = paths[2] || 'index';
		let args = paths.slice(3);
		let model;
		try{
			model = require('./Controller/'+controller);
		}catch(err){
			console.log('aaa:::',err);
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.statusCode = 404;
			res.end('<h1>页面走丢了。。。。</h1>')	

			return;		
		}
		
		if(model[action]){
			//concat是拼接的意思 前面的数组和后面的拼接
			model[action].apply(null,[req,res].concat(args));
		}

	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})