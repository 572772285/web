const express = require('express');
const user=require('./routes/user.js')
//引入中间件插件
const bodyParser = require('body-parser')
const app = express();

//托管静态文件
// app.get('/',(req,res)=>{
// 	res.send('ok')
// })

app.use(express.static('public'));
// app.use('/static',express.static('public'));

//中间件插件步骤
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/user',(req,res)=>{
	console.log('aaa',req.body)
})


//返回打印内容
app.use('/user',require('./routes/user.js'));
app.use('/blog',require('./routes/blog.js'));




//不管任何请求都会走到啊这里
// app.all('/',(req,res,next)=>{
// 	console.log('all')
// 	next()
// })
// app.get('/', function (req, res) {
//   res.send('get date');
// });
// app.get('/ab?cd', function (req, res) {
//   res.send('ab?cd');
// });
// app.post('/', function (req, res) {
//   res.send('post data');
// });
// app.put('/', function (req, res) {
//   res.send('Got a PUT request at /user');
// });
// app.delete('/', function (req, res) {
//   res.send('Got a DELETE request at /user');
// });

app.listen(3000,()=>{
	console.log('app listening at 127.0.0.1:3000')
})