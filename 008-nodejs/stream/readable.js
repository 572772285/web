const Readable=require('stream').Readable;
class Myreadable extends Readable{
	constructor(){
		super();
		this.index=0;
	}
	_read(){
	this.index++;
		
		if(this.index>5){
			this.push(null)
		}else{
			let str='' +this.index;
			const buf=Buffer.from(str)
			this.push(buf)
		}
	}
}
const readable =new Myreadable();
let str='';	
readable .on('data',(chunk)=>{
	str+=chunk
})
readable.on('end',(chunk) => {
  // console.log('There will be no more data.');
  console.log(str)
})