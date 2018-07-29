//流是一个模块，提供了一些基础的API用于构建实现流接口的对象
const Writable = require('stream').Writable;
// console.log(stream)

//想要拿到可写流的方法就要继承父元素
class myWriter extends Writable{
	constructor(){
		super()
	}
	_write(chunk,encoding,callback){
		console.log(chunk.toString())
		callback()
	}
}
const writer=new myWriter('aa')
writer.write('hellow',()=>{
	console.log('我是回调函数')
});

writer.end('我是结尾');
writer.on('finish',()=>{
	console.log('所有写入已完成。')
})
//可读流
// process.stdin.pipe(writer)
