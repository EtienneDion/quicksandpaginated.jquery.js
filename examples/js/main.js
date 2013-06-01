
$(function(){
	$(".portfolioListing").quicksandpaginated({
		wrapper: ".portfolioListing",
		container: '.fn-portfolioCarrousel',
		containerWidth:745,
		thumbs: "article",
		//hoverContainers:'.preview',
		filtersContainer: ".portfolio-filters",
		filters: "li",
		prev: ".carrousel_prev",
		next: ".carrousel_next",
		pageNumberContainer: ".portfolioCarrousel_nav",
		thumbsHeight:186,
		thumbsWidth:248,
		transitionSpeed:400,
		callback:function(c) { c.trigger("complete"); }
	});

});

