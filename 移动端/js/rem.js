	(function(win,doc){
		//1.获取根元素
		var oHtml=doc.getElementsByTagName('html')[0];
		// //2.获取屏幕的宽
		// var iWidth=doc.body.clientWidth||win.document.clientWidth;
		// //3.计算根元素的fontsize
		// var iFontSize=iWidth/10+'px';
		// oHtml.style.fontSize=iFontSize+'px';
		// //构建函数
		function jisuanFontsize(){
			//2.获取屏幕的宽
			var iWidth=doc.body.clientWidth||win.documentElement.clientWidth;
			//3.计算根元素的fontsize
			var iFontSize=iWidth/10+'px';
			oHtml.style.fontSize=iFontSize;
			console.log(iFontSize);
			// alert('aa')
		}
		//刷新改变页面大小执行函数
		win.addEventListener('resize',jisuanFontsize,false);
		win.addEventListener('DOMContentLoaded',jisuanFontsize,false);

	})(window,document);