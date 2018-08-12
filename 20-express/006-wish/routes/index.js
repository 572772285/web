//引入router
const Router = require('express').Router;
const WishModel=require('../models/wish.js')
const router = Router();
//显示首页
router.get("/",(req,res)=>{
	//去数据库里找到所有数据data，渲染主页，返回数据
	WishModel.find({},(err,data)=>{
		if(!err){
			res.render('',{
				data:data
			})
		}else{
			console.log(err);
		}			
	})
})

module.exports = router;