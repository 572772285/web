;(function($){

	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$tabItems = this.$elem.find('.control');
		this.itemNum = this.$tabItems.length;

		this.$tabPanels = $elem.find('.floor-body');

		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
	}
	Tab.prototype = {
		constructor:Tab,
		_init:function(){
			var self=this;
			var timer=null;
			// console.log(this.$tabPanels)
			//初始化添加class和显示第一个选项
			this.$tabItems.eq(this.now).addClass('active');
			this.$tabPanels.eq(this.now).show();
			//监听$tabPanels上面的show、shown、hide、hidden从而达到按需加载目的
			this.$tabPanels.on('show shown hide hidden',function(ev){
				self.$elem.trigger('tab-'+ev.type,[self.$tabPanels.index(this),this]);
			});
						//触发事件
			self.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now]]);
			//事件名称容错处理
			
			if(this.options.eventName=='click'){
				this.options.eventName='click';
			}else{
				this.options.eventName='mouseenter';
			}
			var eventName=this.options.eventName;
			//通过事件代理绑定事件
			
			//使用showhide淡入淡出显示方法
			this.$tabPanels.showHide(this.options);
			this.$elem.on(eventName,'.control',function(){
				// console.log(self.$elem)
				var $this=$(this);
				var index=$this.index();
				console.log($this.index(1))
				if(self.options.delay){
					clearTimeout(timer);
					timer=setTimeout(function(){
						self.toggle(index);
					},self.options.delay)
				}else{
					self.toggle(index);
				}	
			});
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
			}	
		},
		toggle:function(index){
			//隐藏当前的
			this.$tabItems.eq(this.now).removeClass('active');
			this.$tabPanels.eq(this.now).showHide('hide');

			//显示下一个的
			this.$tabItems.eq(index).addClass('active');
			this.$tabPanels.eq(index).showHide('show');
			this.now=index;
		},
		auto(){
			var self = this;
			this.autoTimer = null;
			this.autoTimer = setInterval(function(){
				self.toggle(self._getCorrectIndex(self.now+1));
			},this.options.interval)
		},
		pause(){
			clearInterval(this.autoTimer);
		},		
		_getCorrectIndex(index){
			if(index >= this.itemNum) return 0;
			if(index < 0) return (this.itemNum - 1);
			return index;
		}
	}

	Tab.DEFAULTS = {
		css3:false,
		js:false,
		mode:'fade',
		eventName:'mouseenter',
		activeIndex:0,
		delay:200,
		interval:2000
	}

	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $this = $(this);
				var tab = $this.data('tab');
				if(!tab){//单例模式
					options  = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($(this),options);
					$this.data('tab',tab);
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}
			});
		}
	})

})(jQuery);