		var $searchForm=$('#search-form')
		var $searchInput=$('.search-input');
		var $submit=$('.submit');
		var $searchLayer=$('.searchLayer')

(function($){
	function Search($elem,option){
		this.$elem=$elem;
		this.$searchInput=$searchInput;
		this.$submit=$submit;
	}
	Search.prototype={
		constructor:Search,
		_init:function(){

		}
	}
	$.fn.extend({
			Search:function(option){
				return this.each(function(){
					var $this=$(this),
					var search=$this.data('search')
				})
				
			}
	})
})(jQuery)