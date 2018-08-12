const express=require('express');
const swig = require('swig');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')

//1.启动数据库

//1链接数据库
mongoose.connect('mongodb://localhost:27017/yang',{ useNewUrlParser: true });
const db = mongoose.connection;
//操作的过程中有`1错误怎么办
db.on('error', (err)=>{
	throw err
})
//链接成功 所有的操作都在以下回掉函数中操作
db.once('open', function() {
  	console.log('DB connected success');
})

const app=express();


//配置模板
//2.配置模板的存放目录
//第一个参数必须是views
//第二个参数是模板存放的目录
swig.setDefaults({
  cache: false
});
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

app.set('views','./views');

//3.注册模板引擎
//第一个参数必须是view engine
//第二个参数就是模板名称，也就是app.engine的第一个参数，会自动去view里去找index.html
app.set('view engine','html');





//3配置静态资源
app.use(express.static('public'));
//4添加处理post请求的中间件

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//处理路由
app.use('/',require('./routes/index.js'));
app.use('/wish',require('./routes/wish.js'));


app.listen(3000,()=>{
	console.log('running')
})