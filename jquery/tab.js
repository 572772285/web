(function($){
		$.fn.extend({
			tab:function(options){
				var peizhi={
					btnclass:'active',
					btns:'.btn>li',
					contents:'.content>li',
					eventTpye:'click'
				}
				options=$.extend(peizhi,options);
				console.log(this)
				this.each(function(){
					var $tab=$(this);
					// console.log($tab)
					/*获取btn*/
					var $btns=$tab.find(options.btns);
					// console.log($btns)
					/*给btn添加事件*/
					$btns.on(options.eventTpye,function(){
						$(this).addClass(options.btnclass);
						$(this).siblings().removeClass(options.btnclass);
						var xiabiao=$(this).index();
						var contents=$tab.find(options.contents);
						var now=contents.eq(xiabiao);
						now.addClass('show');
						now.siblings().removeClass('show')
					})
				})
			}
		})
	})(jQuery);