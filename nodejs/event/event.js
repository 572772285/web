const EventEmitter=require('events');
//1继承这个事件的方法
//2添加事件
//3触发事件
class MyEmitter extends EventEmitter{

}

const myEmitter=new MyEmitter();

myEmitter.setMaxListeners(17)//设置监听事件数量最大默认值
// myEmitter.on('test',()=>{
// 	console.log('test')
// })
// myEmitter.on('test',()=>{
// 	console.log('test1')
// })
// myEmitter.on('test',()=>{
// 	console.log('test2')
// })
// myEmitter.on('test',()=>{
// 	console.log('test3')
// })
// myEmitter.on('test',()=>{
// 	console.log('test4')
// })
// myEmitter.on('test',()=>{
// 	console.log('test5')
// })
// myEmitter.on('test',()=>{
// 	console.log('test6')
// })
// myEmitter.on('test',()=>{
// 	console.log('test7')
// })
// myEmitter.on('test',()=>{
// 	console.log('test8')
// })
// myEmitter.on('test',()=>{
// 	console.log('test9')
// })
// myEmitter.on('test',()=>{
// 	console.log('test10')
// })
// myEmitter.on('test',()=>{
// 	console.log('test11')
// })
// myEmitter.on('test',()=>{
// 	console.log('test12')
// })
// myEmitter.on('test',()=>{
// 	console.log('test13')
// })
let fn1=(arg1,arg2)=>{
	console.log('test',arg1,arg2)
	console.log(this)
	}
let fn2=(arg1,arg2)=>{
	console.log('test1',arg1,arg2)
	console.log(this)
}
	myEmitter.on('newListener',()=>{
		console.log('newListener...')
	})
 	myEmitter.on('test',fn1)
  	myEmitter.on('test',fn2)
	myEmitter.removeListener('test',fn1)
	myEmitter.emit('test','aa','bb');
//后端的传参事件与前端不同，前端第一个参数需要穿event，后面的参数以数组的形式传进去
