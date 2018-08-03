const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const url = require('url');
const querystring = require('querystring');
const swig = require('swig');
const mongoose=require('mongoose');
	mongoose.connect('mongodb://localhost:27017/yang',{ useNewUrlParser: true });
	const db = mongoose.connection;
	//操作的过程中有`1错误怎么办
	db.on('error', (err)=>{
		throw err
	})
	//链接成功 所有的操作都在以下回掉函数中操作
	db.once('open', function() {
	  	console.log('DB connected success');
	})
const server = http.createServer((req,res)=>{
	
	
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
		let controller = paths[1] || 'Wish';
		let action = paths[2] || 'index';
		let args = paths.slice(3);
		let model;
		try{
			model = require('./Controller/'+controller);
		}catch(err){
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.statusCode = 404;
			res.end('<h1>页面走丢了。。。。</h1>')	

			return;		
		}
		
		if(model[action]){
			model[action].apply(null,[req,res].concat(args));
		}

	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})