const fs=require('fs');
fs.open('./001.txt','r',(err,fd)=>{
	if(!err){//打开文件成功
		console.log('open file sucess')
		let buf=Buffer.alloc(100);
		fs.read(fd,buf,0,100,0,(err)=>{
			if(!err){//读文件成功
				console.log('read file sucess');
				fs.close(fd,(err)=>{
					if(!err){//关闭文件成功
						console.log('close file sucess',buf.toString())
					}else{
						console.log('close file fail')
					}
				})
			}else{
				console.log('read file fail')
			}
		})
	}else{
		console.log('open file fail')
	}
})