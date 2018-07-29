
(function($){
	function DropDown($elem,options){
		this.$elem=$elem;
		this.options=options;
		this.activeClass=$elem.data('active')+'-active';
		this.$layer=$elem.find('.dropdown-layer');
		this._init();
		
	};
	DropDown.prototype={
		constructor:DropDown,
		_init:function(){
			//初始化显示隐藏模块
			this.$layer.showHide(this.options);
			this.$layer.on('show shown hide hidden',function(ev){
				// console.log(ev.type)
				this.$elem.trigger('dropdown-'+ev.type)
			}.bind(this))
			// this.$elem.hover(this.show.bind(this),this.hide.bind(this))
			//下面是代理方法，和bindthis方法效果相同
			if(this.options.eventName=='click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show()
				}.bind(this));
				$(document).on('click',$.proxy(this.hide,this));
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}
		},
		show:function(){
			if(this.options.delay){
				this.timer=setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);					
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);		
			}

		},
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
			}
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	}
	DropDown.DEFAULES={
		css3:false,
		js:true,
		mode:'fadeSlideUpDown',
		delay:200,
		eventName:''
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $this=$(this);
				var dropdown=$this.data('dropdown');
				if(!dropdown){
					options=$.extend(DropDown.DEFAULES,options);
					dropdown=new DropDown($(this),options);
					$this.data('dropdown',dropdown);
				}
				if(typeof dropdown[options]=='function'){
					dropdown[options]();
				}
				// var options=$.extend(DropDown.DEFAULES,options);
				// var dropdown=new DropDown($(this),options);
			})
		}
	})
})(jQuery);