// let str='hello';
// global.str=str;
// console.log(str)
// console.log(global)



//exports和module.exports在定义一个对象时他们都指向同一个对象
//，如果给其中一个指定了一个新对象，则会改变他们同时指向一个相同对象，改变了相同指向
let obj={name:"tom",age:18}
let fn=()=>{
	console.log('我是多么的无敌..') 
}
module.exports.obj=obj;
module.exports.fn=fn;
exports.arr=[11,22,33]
// console.log(module.exports.obj)
// console.log(module.exports.fn)
// console.log(module.exports)
