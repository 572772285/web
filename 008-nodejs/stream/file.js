const fs=require('fs')
//同步读写文件
/*
fs.writeFileSync('./001.txt','ccc',{flag:'a'}) 
let data=fs.readFileSync('./001.txt');
console.log(data.toString())
*/
//异步读写文件
fs.writeFile('./001.txt','aaa\n',{flag:'a'},(err)=>{
	console.log('write sucess')
})
fs.readFile('./001.txt',(err,data)=>{
	console.log('read file sucess')
	console.log(data.toString())
})