		var timer=null;
		function animation(obj,option,isLinear,fn){
			var isPeed=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
					var quanbu=true;
					for(attr in option){
						var isStop=false;
						var curr=parseFloat(getComputedStyle(obj,false)[attr]);					
						if(attr=='opacity'){
							curr=Math.round(curr*100)
							/*四舍五入*/
						}
						if(isLinear){
							if(curr<option[attr]){
								isPeed=5;
							}else{
								isPeed=-5;
							}
							if(Math.abs(option[attr]-curr)<Math.abs(isPeed)){
								isStop=true;
								
							}else{
								quanbu=false;
							}
						}else{
							isPeed=(option[attr]-curr)/10;
							isPeed=isPeed>0?Math.ceil(isPeed):Math.floor(isPeed);
							if(!isPeed){
								isStop=true;
								
							}else{
								quanbu=false;
							}
						}
						/*向上取整和向下取整*/
						
						if(isStop){
							if(isLinear){
								if(attr=='opacity'){
									obj.style[attr]=option[attr]/100;
								}else{
									obj.style[attr]=option[attr]+'px';
								}
							}
							/*线性动画或者减速动画都执行完了之后才会调用函数参数*/
							
						}else{
							if(attr=='opacity'){
								obj.style[attr]=(curr+isPeed)/100;
							}else{
								obj.style[attr]=curr+isPeed+'px'
							}
						}
					}
					if(quanbu==true){
						clearInterval(obj.timer);
							if(fn){
								fn();
							}						
					}
				},30)
		}