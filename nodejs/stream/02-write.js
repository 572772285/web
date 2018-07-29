



const fs=require('fs');
fs.open('./001.txt','w',(err,fd)=>{
	if(!err){
		console.log('open file sucess')
		fs.write(fd,'aaa',(err)=>{
			if(!err){
				console.log('write file sucess')
				fs.close(fd,(err)=>{
					if(!err){
						console.log('close file sucess')
					}else{
						console.log('close file sucess')
					}
				})
			}else{
				console.log('write file fail')
			}
		})
	}else{
		console.log('open file fail')
	}
})