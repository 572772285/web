//2个16进制数=1个字节(b)
//16进制数的范围 00-ff
//0-255 10进制
//00000000 - 11111111 2进制
//0或者1代表了1bit(位)
//8bit=1b(字节)
//node 中一个汉字=3b

/*
const buf=new Buffer(10)
console.log(buf)
*/

/*
const buf=Buffer.alloc(10)
buf[0]=10 //10进制下标
buf[1]=0x10 //16进制
console.log(buf)
console.log(buf.length)
*/


// 创建一个新的包含字符串 'buffer' 的 UTF-8 字节的 Buffer如果 array 不是一个数组，则抛出 TypeError 错误node 中一个汉字=3b
const buf=Buffer.from('跨朱')
console.log(buf)
console.log(buf.toString())
