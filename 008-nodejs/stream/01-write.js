const fs=require('fs');
//打开文件  fd文件描述
let fd=fs.openSync('./002.txt','w')
let write=fs.writeFileSync(fd,'ccccc')
let close=fs.closeSync(fd)
console.log(write)
