const fs=require('fs');
//打开文件  fd文件描述
let fd=fs.openSync('./001.txt','r')
let buf=Buffer.alloc(100)
fs,readSync(fd,buf,0,100,0)
console.log(buf)