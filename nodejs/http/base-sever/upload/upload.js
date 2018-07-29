const http = require('http')
const url =require('url');
//querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。 可以通过以下方式使用：
const querystring = require('querystring');
const formidable = require('formidable');
const util = require('util');
const fs = require('fs');
const path=require('path');


// console.log(req.url);

const server = http.createServer(function(req,res){
	console.log(req.method);
  	if(req.method.toLowerCase() == 'post') {
   		// parse a file upload
    	let form = new formidable.IncomingForm();
    	form.uploadDir = "./uploadimg";
    	form.keepExtensions = true;
    	form.parse(req, function(err,fields,files) {
    		let oldPath='./'+files.img.path;
    		let extname=path.extname(oldPath);
    		let newPath='./uploadimg/'+(new Date().getTime()+Math.random())+extname;
    		fs.rename(oldPath,newPath,(err)=>{
    			if(!err){
    				res.writeHead(200, {'content-type': 'text/plain'});
     				res.write('received uploadimg:\n\n');
      				res.end(util.inspect({fields: fields, files: files}));
    			}
    		});
     		
   		});

    	return;
	}	

    res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.write('<h1>OK</h1>');
	res.end();
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in the 127.0.0.1:3000');
})
