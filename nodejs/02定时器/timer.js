/*
//单次定时器是异步，如果清掉定时器则不会执行
console.log(1)
let t=()=>{
	let t1=setTimeout(()=>{
		console.log(2)
	},1000)
	clearTimeout(t1)
}
t()
console.log(3)
*/


/*
//循环定时器是异步，如果清掉定时器则不会执行
console.log(1)
let t=()=>{
	let t1=setInterval(()=>{
		console.log(2)
	},1000)
	clearInterval(t1)
}
t()
console.log(3)
*/

/*
//同步定时器是异步，如果清掉定时器则不会执行
console.log(1)
let t=()=>{
	let t1=setInterval(()=>{
		console.log(2)
	},1000)
	clearInterval(t1)
}
t()
console.log(3)
*/

//同步定时器是异步，如果清掉定时器则不会执行
console.log(1)
let t=()=>{
	let t1=setImmediate(()=>{
		console.log(2)
	},1000)
	// clearImmediate(t1)
}
t()
console.log(3)