;(function($){

	function loadHtmlOnce($elem,callBack){
		//获取需要请求的地址
		var loadUrl = $elem.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $elem.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log('get data ...',data);
			callBack($elem,data);
		});		
	}

	//获取数据一次
	function getDataOnce($elem,url,callBack){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data(url,resData);
				callBack(resData);
			})
		}else{
			callBack(data);
		}
	}

	//请求图片成功或失败
	function loadImage(url,success,error){
		var image = new Image();

		image.onload = function(){
			if(typeof success == 'function') success(url);
		}

		image.onerror = function(){
			if(typeof error == 'function') error(url);
		}

		image.src = url;		
	}

	//懒加载
	/*
	懒加载实例
	options = {
		totalItemNum:5
		$elem:$elem,
		eventName:'tab-show',
		eventPrefix:'tab'
	}
	*/
	function lazyLoad(options){
		var item = {},//判断对应元素是否加载过
		    totalItemNum =  options.totalItemNum,//总共需要脚在的项目
			loadedItemNum = 0,
			loadFn = null,
			$elem = options.$elem,
			eventName = options.eventName,
			eventPrefix = options.eventPrefix;
			console.log($elem)
		
		$elem.on(eventName,loadFn = function(ev,index,elem){//确定加载时机
			if(item[index] != 'loaded'){//具体加载
				$elem.trigger(eventPrefix+'-loadItem',[index,elem,function(){
					item[index] = 'loaded';
					loadedItemNum++;
					if(loadedItemNum == totalItemNum){//整个加载结束
						$elem.trigger(eventPrefix+'-loadedItems')
					}
				}])
			}
		});

		$elem.on(eventPrefix+'-loadedItems',function(){//加载完成后移除的事情
			$elem.off(eventName,loadFn)
		});
	}	
	//公共函数结束
	/*顶部下拉菜单开始*/
	var $menu = $('.nav-site .dropdown');
	//接收trigger事件   
	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuItem)
	});
	//构建菜单并加重
	function buildMenuItem($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);
	}
	$menu.dropdown({
		css3:false,
		js:true,
		mode:'slideUpDown'
	});

	/*顶部下拉菜单结束*/
	
	/*搜索框开始*/

	var $search = $('.search');
	
	//search插件初始化
	$search.search({
		autocomplete:true,
		getDataInterval:0
	});
	
	$search
	.on('getData',function(ev,data){
			var $this = $(this);
			var html = createSearchLayer(data,10);	
			$this.search('appendLayer',html);
			if(html){
				$this.search('showLayer');
			}else{
				$this.search('hideLayer');
			}
	})
	.on('getNoData',function(){
		$search.search('appendLayer','').search('hideLayer');
	})
	.on('click','.search-item',function(){
		$search.search('setInputVal',$(this).html());
		$search.search('submit');

	});

	function createSearchLayer(data,maxNum){
		if(data.result.length == 0){
			return '';
		}		
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html;
	}
	/*搜索框结束*/	

	/*分类菜单开始*/
	var $category = $('.category .dropdown');

	$category.on('dropdown-show',function(ev){

		loadHtmlOnce($(this),buildCategorItem);

	});
	function buildCategorItem($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details clearfix"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
			}
			html += '</dd>`</dl>';
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);		
	}

	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});



	//轮播图按需加载函数
	function carouselLoading($elem){
		$elem.item = {};
		$elem.totalItemNum =  $elem.find('img').length;
		$elem.loadedItemNum = 0;
		
		$elem.on('carousel-show',$elem.loadFn = function(ev,index,elem){
			console.log('carousel-show loading...');
			if($elem.item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem])
			}
		});

		$elem.on('carousel-loadItem',function(ev,index,elem){
			console.log(index,'loading...');
			
			var $imgs = $(elem).find('.carousel');
			$imgs.each(function(){
				// console.log(this)
				var $img=$(this)
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					setTimeout(function(){
					$img.attr('src',url);
					},1000)
				},function(url){
					$img.attr('src','images/focus-carousel/placeholder.png');
				});
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.totalItemNum){
					$elem.trigger('carousel-loadedItems')
				}
			})
			$elem.on('carousel-loadedItems',function(){
				$elem.off('carousel-show',$elem.loadFn)
			});
		});
	}



	/*中心轮播图开始*/
	var $focusCarousel = $('.focus .carousel-container');
	//调用按需加载函数
	carouselLoading($focusCarousel);	
	//加载完毕后off
	
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
	})
	/*中心轮播图结束*/
	/*今日热销开始*/
	var $todaysCarousel = $('.todays .carousel-container');
	//调用按需加载函数
	carouselLoading($todaysCarousel);
	//加载完毕后off
	$todaysCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		// interval:0
	})
	/*今日热销结束*/
	/*鞋包服装开始*/

	//鞋包按需加载函数
	var $floors=$('.floor');
	
	var $win = $(window);
	var $doc = $(document);
	//滚动到距离显示加载区域内容
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height())
	}
	function timeToShow(){
		$floors.each(function(index){
			if(isVisible($(this))){
				$doc.trigger('floor-show',[index,this])
			}
		})
	}

	//楼层HTML图按需加载函数
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeadHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeadHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-top">';
		html += '	<div class="floortitle">';
		html += '	<div class="left fl">';
		html += '		<div class="fl">'+oneFloorData.num+'F</div>';
		html += '		<h2 class="fl">'+oneFloorData.text+'</h2>';
		html += '	</div>';
		// html += '	<ul class="tab-item-wrap fr">';
		html += '	<div class="right fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
			html +=	'<span class="control">'+oneFloorData.tabs[i]+'</span>';
			// if(i != oneFloorData.tabs.length-1){
			// 	html +=	 '<li class="fl tab-divider"></li>';
			// }
		}
		html += '	</div>';
		html += '	</div>';
		html += '</div>';

		return html;
	}

	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		
		
		for(var i = 0;i<oneFloorData.items.length;i++){
			html += '<div class="floor-body">';

			
				for(var j = 0;j<oneFloorData.items[i].length;j++){
					html += '<div class="imgs">';
					html += '<div class="imgs">';
					html += '	<a href="#">';
					html += '		<img src="images/floor/loading.gif" class="floor-img" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';

					html += '		<p>';
					html += '	<span>'+oneFloorData.items[i][j].name+ '</span>';
					html += '	</p>';
					html += '		<p>';
					html += '	<span class="price">￥'+oneFloorData.items[i][j].price+'</span>';
					html += '	</p>';
					html += '	</a>';
					html += '	</div>';
					html += '	</div>';
				}																					
				
			html += '</div>';		
			}			
		
		return html;		
	}
	//楼层图片的具体加载
	$floors.on('tab-loadItem',function(ev,index,elem,success){
		var $imgs = $(elem).find('.floor-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(url){
				setTimeout(function(){
					$img.attr('src',url);
				},1000)
				
			},function(url){
				$img.attr('src','images/floor/placeholder.png');
			});
		})
		success();
	});
	//楼层html的具体加载
	$doc.on('floor-loadItem',function(ev,index,elem,success){
		var $elem = $(elem);
		//请求数据
		getDataOnce($doc,'data/floor/floorData.json',function(floorData){
			var html = buildFloorHtml(floorData[index]);
			//模拟网络延时
			setTimeout(function(){
				$elem.html(html);
				//加载图片
				lazyLoad({
					totalItemNum:$elem.find('.floor-img').length,
					$elem:$elem,
					eventName:'tab-show',
					eventPrefix:'tab'		
				});
				$elem.tab({
					css3:false,
					js:false,
					mode:'fade',
					eventName:'mouseenter',
					activeIndex:0,
					delay:200,
					interval:0
				});					
			},500)
		});
		success();
	});

	//楼层html的按需加载
	lazyLoad({
		totalItemNum:$floors.length,
		$elem:$doc,
		eventName:'floor-show',
		eventPrefix:'floor'	
	});

	$win.on('scroll resize',$floors.toShowFn = function(){
		clearTimeout($floors.floorTimer);
		$floors.floorTimer = setTimeout(function(){
			timeToShow();
		},200)
	});
	/*鞋包服装结束*/

	//判断楼层号
	function whichFloor(){
		var num = -1;
		$floors.each(function(index,elem){
			num = index;
			if($win.scrollTop() + $win.height()/2 < $(elem).offset().top){
				num = index - 1;
				return false;
			}
		})
		return num;
	}
	//设置电梯
	var $elevator = $('#elevator');
	$elevator.items = $elevator.find('.elevator-item');
	function setElevator(){
		var num = whichFloor();
		if(num == -1){
			$elevator.fadeOut(); 
		}else{
			$elevator.fadeIn();
			$elevator.items.removeClass('elevator-active'); 
			$elevator.items.eq(num).addClass('elevator-active'); 
		}
	}
	//监听事件自动设置楼层
	$win.on('scroll resize load',function(){
		clearTimeout($elevator.elevatorTimer);
		$elevator.elevatorTimer = setTimeout(function(){
			setElevator();
		},200)
	});
	//监听电梯点击事件
	$elevator.on('click','.elevator-item',function(){
		var num = $elevator.items.index(this);
		$('body,html').animate({
			scrollTop:$floors.eq(num).offset().top
		})
	});

	/*电梯结束*/

	/*回到顶部*/
	$('#backToTop').on('click',function(){
		$('body,html').animate({
			scrollTop:0
		})
	});
})(jQuery);