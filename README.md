QuickSand With Pagination : quicksandpaginated.jquery.js
============================
Extention to Jquery Quicksand : http://razorjack.net/quicksand/docs-and-demos.html

Required:
jquery.js (more than jQuery 1.3+), 
jquery-migrate.js (if jQuery 1.9 is use),
jquery.quicksand.js : http://razorjack.net/quicksand/docs-and-demos.html


bower install quicksandpaginated.jquery.js


How to use :
$(function(){
  $(".portfolioListing").quicksandpaginated({
		wrapper: ".largerContainer", // larger container need to contain the inner container were element are display and a container with the filters must have a data-rel-list="master-list". master-list= div id with list of element to show
		container: '.displayArea', //inner container that will show elements
		containerWidth:745, // width of the inner container
		thumbs: "div.element", // selector of element in the list to show : must have a data-categories="Games Utility" with the list of filters in which element shoud be shown and must be in the #master-list 
		filtersContainer: ".filters",  // filter container
		filters: "li",  // filter elements, must have a data-category="Photography" with the filter name which will be the link with the data-categories="Photography Utility" on elements to show 
		prev: ".prev", // prev nav selector
		next: ".next", // next nav selector
		pageNumberContainer: ".nav", // selector pointing to a div where the nav will be rendered
		thumbsHeight:186, // element to show Height
		thumbsWidth:248, // element to show Width
		transitionSpeed:400, // transition Speed
		callback:function(c) { c.trigger("complete"); } // callback when filter have been applied, c is the container (.displayArea in the example)
	});

});

See examples.


More Doc and examples will follow...
