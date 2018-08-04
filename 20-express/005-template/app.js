const express=require('express');
const swig=require('swig');
const app=express();
//开发的过程中把cache-缓存给关掉，在修改的时候就不用重启服务了
swig.setDefaults({
  cache: false
})

	
//1配置模板
//第一个参数是模板名称，同时也是模板文件的扩展名
//第二个是解析模板的方法
app.engine('html',swig.renderFile);

//2.配置模板的存放目录
//第一个参数必须是views
//第二个参数是模板存放的目录
app.set('views','./views');

//3.注册模板引擎
//第一个参数必须是view engine
//第二个参数就是模板名称，也就是app.engine的第一个参数，会自动去view里去找index.html
app.set('view engine','html');

app.get('/',(req,res)=>{
	//4.渲染模板
	//第一个参数是相对于模板目录的文件
	//第二个是传递给模板的数据
	res.render('index',{
		title:"跨猪网",
		content:"欢迎来到跨猪王学习",
		name:"aaa",
		arr:["tom","leo","mike","cobe","jams"]
	})
})
app.get('/moban',(req,res)=>{
	//4.渲染模板
	//第一个参数是相对于模板目录的文件
	//第二个是传递给模板的数据
	res.render('moban')
})
app.get('/list',(req,res)=>{
	//4.渲染模板
	//第一个参数是相对于模板目录的文件
	//第二个是传递给模板的数据
	res.render('list')
})
app.get('/boke',(req,res)=>{
	//4.渲染模板
	//第一个参数是相对于模板目录的文件
	//第二个是传递给模板的数据
	res.render('boke')
})

app.listen(3000,()=>{
	console.log('app listening at 127.0.0.1:3000')
})