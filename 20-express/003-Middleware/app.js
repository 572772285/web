var express = require('express');
var app = express();
//app其实就是一个处理


app.use((req,res,next)=>{
	console.log('req before')
	next()
	console.log('req after')
})
app.use((req,res,next)=>{
	console.log('req1 before')
	next()
	console.log('req1 after')
})
app.use((req,res,next)=>{
	console.log('req2 before')
	next()
	console.log('req2 after')
})
app.get('/g', function (req, res) {
  res.send('get date');
});
// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;



app.listen(3000,()=>{
	console.log('app listening at 127.0.0.1:3000')
})