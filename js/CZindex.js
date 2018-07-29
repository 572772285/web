window.onload=function(){
	// navscroll();
	// function navscroll(){
	// 	var show=false;
	// 	window.onscroll=window.onresize=window.onload=function(){
	// 		var oHead0=document.getElementById('head0');
	// 		var oSection=document.getElementById('section');
	// 		var iTop=document.body.scrollTop||document.documentElement.scrollTop;
	// 		var iHeight=window.innerHeight;
	// 		if(iTop>140){
	// 			if(!show){
	// 				animation(oHead0,{'height':'100'},false);
	// 				oSection.style.marginTop='150px';
	// 				show=true;
	// 			}
	// 		}else{
	// 			if(show){
	// 				animation(oHead0,{'height':'0'},false);
	// 				oSection.style.marginTop='0px';
	// 				show=false;
	// 			}
	// 		}
	// 	}
		/*搜索框*/
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
	}
