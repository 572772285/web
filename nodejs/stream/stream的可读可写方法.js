const fs=require('fs');
const writable=fs.createWriteStream('./stream.txt',{flags:'a'});

const readable=fs.createReadStream('./001.txt');
let str='';
readable.on('data',(chunk)=>{
	str+=chunk;
})
readable.on('end',(chunk) => {
  // console.log('There will be no more data.');
  console.log(str)
})

// writable.write('aaa\n')
// writable.write('ccc')
// writable.end('write end....')
// writable.on('finish',()=>{
// 	console.log('finish...')
// })
readable.pipe(writable);