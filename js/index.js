window.onload=function(){
	navscroll();
	function navscroll(){
		var show=false;
		window.onscroll=window.onresize=window.onload=function(){
			var oHead0=document.getElementById('head0');
			var oSection=document.getElementById('section');
			var iTop=document.body.scrollTop||document.documentElement.scrollTop;
			var iHeight=window.innerHeight;
			if(iTop>140){
				if(!show){
					animation(oHead0,{'height':'100'},false);
					oSection.style.marginTop='150px';
					show=true;
				}
			}else{
				if(show){
					animation(oHead0,{'height':'0'},false);
					oSection.style.marginTop='0px';
					show=false;
				}
			}
		}
	}

/*购物车*/
	handleCart();
	function handleCart(){
		var oCat=document.querySelector('.cart');
		var oCatload=document.querySelectorAll('.loading')[0];
		var oSpan=oCatload.nextElementSibling;
		var oCartbox=document.querySelector('.cart-box');
		var oCatA=oCat.getElementsByTagName('a')[0];
		oCat.onmouseenter=function(){
			oCat.style.background='#fff';
			oCatA.style.color='#fa6700';
			oCatload.style.display='block';
			// oCartbox.style.height='100px';
			/*用animation动画执行回调函数，先变高再变display*/
			animation(oCartbox,{'height':'100'},false,function(){
				oCatload.style.display='none';
				oSpan.style.display='block';
			})
		}
		oCat.onmouseleave=function(){	
			oCat.style.background='#333';
			oCatA.style.color='#b0b0b0';
			animation(oCartbox,{'height':'0'},false,function(){
				oCatload.style.display='none';
				oSpan.style.display='block';
			})
		}
	}

	handlenav();
	var oImgphone=document.querySelector('.imgphone');
	var oPhoneloading=document.querySelectorAll('.loading')[1];
	function handlenav(){
		var timer=null;
		var oNavA=document.querySelectorAll('.headleft a');
		var oNavbox=document.querySelector('.nav-content');
		for(var i=0;i<oNavA.length-13;i++){
			oNavA[i].index=i;
			oNavA[i].onmouseenter=function(){
				clearTimeout(timer);
				oNavbox.style.borderTop='1px solid #ccc';
				animation(oNavbox,{'height':200},false,function(){
					oPhoneloading.style.display='none';
				});
				loadtate(this.index);
			}
			oNavA[i].onmouseleave=function(){
				timer=setTimeout(function(){
					animation(oNavbox,{'height':1},false,function(){
						oNavbox.style.borderTop='none';
					})
				},500)
			}
		}
		oNavbox.onmouseenter=function(){
			clearTimeout(timer);
		}
		oNavbox.onmouseleave=function(){
			timer=setTimeout(function(){
					animation(oNavbox,{'height':'0'},false);
				},500)
		}
	}
	function loadtate(index){
		var shuzu=duogeshuzu[index];
		console.log(shuzu)
		oImgphone.innerHTML='';
		if(!shuzu){
			return false;
		}
		for(var i=0;i<shuzu.length;i++){
			
			var oLi=document.createElement('li');
			oImgphone.appendChild(oLi);
			var oImg=document.createElement('img');
			oImg.src=shuzu[i].img;
			console.log(shuzu[i].img)
			oLi.appendChild(oImg);
			var oP=document.createElement('p');
			oP.innerHTML=shuzu[i].name;
			oLi.appendChild(oP);
			var oSpan1=document.createElement('span');
			oSpan1.innerHTML=shuzu[i].price;
			oLi.appendChild(oSpan1);
		}
		
	}

/*小米轮播js*/

	function Carousel(option){
		//罗列属性
		//获取容器
		this.oBox = document.getElementById(option.id);
		this.oImgUl = null;
		this.aImg = option.aImg;
		this.width = option.width;
		this.height = option.height;
		this.leftBtn = null;
		this.rightBtn = null;
		this.oBottomBtn = null;
		this.now = 0;
		this.lunbotime=option.lunbotime;
		//初始化
		this.init();
		//绑定事件
		this.bindEvent();
		if(this.lunbotime){
			this.lunbo();
		}
	}
	Carousel.prototype.init = function(){
		//创建方图片的ul容器
		this.oBox.style.width = this.width + 'px';
		this.oBox.style.height = this.height + 'px';
		this.oBox.style.position = 'relative';
		this.oImgUl = document.createElement('ul');
		for(var i = 0;i<this.aImg.length;i++){
			var oLi = document.createElement('li');
			var oImg = document.createElement('img');
			oLi.style.position = 'absolute';
			oLi.style.top = 0;
			oLi.style.left = 0;
			//默认显示第一张
			if(i==0){
				oLi.style.opacity = 1;
				oLi.style.zIndex = 50;
			}else{
				oLi.style.opacity = 0.5;
				oLi.style.zIndex = 0;
			}
			oImg.style.width = this.width + 'px';
			oImg.style.height = this.height + 'px';
			oImg.src = this.aImg[i];
			oLi.appendChild(oImg);
			this.oImgUl.appendChild(oLi);
		}
		//左右按钮
		this.leftBtn = document.createElement('span');
		this.rightBtn = document.createElement('span');
		this.leftBtn.className = 'leftBtn';
		this.rightBtn.className = 'rightBtn';
		this.leftBtn.style.zIndex = 999;
		this.rightBtn.style.zIndex = 999;
		this.leftBtn.innerHTML = "&lt;";
		this.rightBtn.innerHTML = "&gt;";
		
		//底部按钮
		this.oBottomBtn = document.createElement('ul');
		this.oBottomBtn.className = 'bottomBtn';
		this.oBottomBtn.style.zIndex = 999; 
		for(var i = 0;i<this.aImg.length;i++){
			var oLi = document.createElement('li');
			if(i == 0){
				oLi.className = 'active';
			}
			this.oBottomBtn.appendChild(oLi);
		}
		//把按钮添加到到顶层父容器中
		this.oBox.appendChild(this.leftBtn);
		this.oBox.appendChild(this.rightBtn);
		
		this.oBox.appendChild(this.oBottomBtn);
		//给底部按钮容器添加ml使其水平居中
		this.oBottomBtn.style.marginLeft = - this.oBottomBtn.offsetWidth * 0.5 + 'px';
		//把ul容器添加到顶层父容器中
		this.oBox.appendChild(this.oImgUl);
	}
	Carousel.prototype.bindEvent = function(){
		//显示下一张
		this.rightBtn.onclick = function(){
			this.now++;
			if(this.now >=  this.oImgUl.children.length){
				this.now = 0;
			}
			this.tab();
		}.bind(this);
		//显示上一张
		this.leftBtn.onclick = function(){
			this.now--;
			if(this.now < 0){
				this.now = this.oImgUl.children.length - 1;
			}
			this.tab();
		}.bind(this);
		var _left=this
		for(var i=0;i<this.oBottomBtn.children.length;i++){
			this.oBottomBtn.children[i].index=i; 
			// console.log(this.oImgUl.children[i]);
			this.oBottomBtn.children[i].onclick = function(){
				// console.log(this);
				_left.now=this.index;
				_left.tab();					
			}
		}		
	}
	Carousel.prototype.lunbo=function(){
		this.dingshiqi = setInterval(this.rightBtn.onclick,this.lunbotime);
		this.oBox.onmouseover = function(){
			clearInterval(this.dingshiqi);
		}.bind(this)
		this.oBox.onmouseout = function(){
			this.dingshiqi=setInterval(this.rightBtn.onclick,this.lunbotime);
		}.bind(this)
	}
	Carousel.prototype.tab = function(){
		//改变所有的li
		for(var i = 0;i<this.oImgUl.children.length;i++){
			this.oImgUl.children[i].style.zIndex = 0;
			this.oImgUl.children[i].style.opacity = 0.5;
			this.oBottomBtn.children[i].className = '';
		}
		//改变当前的li
		this.oImgUl.children[this.now].style.zIndex = 50;
		// this.oImgUl.children[this.now].style.opacity = 1;
		animation(this.oImgUl.children[this.now],{opacity:100},false);
		this.oBottomBtn.children[this.now].className = 'active';				
	}
	new Carousel({
		id:'div1',
		aImg:[
			'../小米/hot2.png',
			'../小米/hot6.jpg',
			'../小米/hot7.jpg',
			'../小米/hot8.jpg',
			'../小米/hot9.jpg',
		],
		width:1100,
		height:460,
		lunbotime:3000
	});
	/*search搜索框*/
	search();
	function search(){
		var oIput=document.querySelector('.headright').children[0];
		var oSpan=document.querySelector('.headright').getElementsByTagName('span');
		var oDiv=document.querySelector('.headright').getElementsByTagName('div')[0];
		oIput.onfocus=function(){
			oSpan[0].style.display='none';
			oSpan[1].style.display='none';
			oDiv.style.display='block';
		}
		oIput.onblur=function(){
			oSpan[0].style.display='block';
			oSpan[1].style.display='block';
			oDiv.style.display='none';
		}
	}

	/*list菜单*/
	list();
	var oListul=document.querySelector('.list-ul');
 	function list(){
 		var oA=document.querySelectorAll('.oa');
 		var oListbox=document.querySelector('.list-box');
 		var timer=null;
 		clearTimeout(timer);
 		for(var i=0;i<oA.length;i++){
 			oA[i].index=i;
 			oA[i].onmouseenter=function(){
 				loadtate1(this.index);
 				clearTimeout(timer);
 				for(var j=0;j<oA.length;j++){
 					oA[j].className='';
 				}
 				this.className='active';
 				oListbox.style.display='block';
 			}
 			oA[i].onmouseleave=function(){
 				timer=setTimeout(function(){
 					oListbox.style.display='none';
 				},300)
 			}
 			oListbox.onmouseenter=function(){
 				clearTimeout(timer);
 				oListbox.style.display='block';
 				console.log('1111')
 			}
 			oListbox.onmouseleave=function(){
 				timer=setTimeout(function(){
 					oListbox.style.display='none';
 				},300)
 			}
 		}
 	}
 	function loadtate1(index){
		var shuzu=lists[index];
		console.log(shuzu)
		oListul.innerHTML='';
		if(!shuzu){
			return false;
		}
		for(var i=0;i<shuzu.length;i++){
			var oLi=document.createElement('li');
			oListul.appendChild(oLi);
			var oImg=document.createElement('img');
			oImg.src=shuzu[i].img;
			oLi.appendChild(oImg);
			var oA=document.createElement('a');
			oA.innerHTML=shuzu[i].name;
			oLi.appendChild(oA);
		}
		
	}

	/*闪购切换*/
	(function flash(){
		var oSpan=document.querySelectorAll('.flashspan');
		var oRightbox=document.querySelectorAll('.right')[0];
		oSpan[0].onclick=function(){
			animation(oRightbox,{'marginLeft':0},false);
			oSpan[1].className='flashspan';
			oSpan[0].className='flashspan flahactive';
		}
		oSpan[1].onclick=function(){
			animation(oRightbox,{'marginLeft':-880},false);
			oSpan[0].className='flashspan';
			oSpan[1].className='flashspan flahactive';
		}

	})();
	/*闪购倒计时*/
	(function timer(){
		function tostr(num){
			if(num<10){
				return '0'+num;
			}else{
				return ''+num;
			}
		}
		setInterval(likezhixing,1000)
		function likezhixing(){
			var oTimer=document.querySelectorAll('.time');
			/*获取未来时间*/
			var nextdate=new Date('2018/05/25 12:00:00').getTime();
			/*获取当前时间*/
			var now=new Date().getTime();
			var daojishi=nextdate-now;
			var s=parseInt(daojishi/1000);
			// console.log(s)
			var h=parseInt(s/3600);
			var m=parseInt(s%3600/60);
			var s1=(s%3600)%60;
			oTimer[0].innerHTML=tostr(h);
			oTimer[1].innerHTML=tostr(m);
			oTimer[2].innerHTML=tostr(s1);
		}
		likezhixing();
	})();
}

