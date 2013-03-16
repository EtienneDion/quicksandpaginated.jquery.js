
/*  Based on work of Zipfolio --> http://stevengliebe.com
*
*	quicksandpaginated.jquery.js
*	QuickSand Paginated
*
*	V. 0.0.9
*   Needs a lot of refactoring...
*   TODO: remove all id work with class and make it work with multiply easyly with class
*/
																	
(function($){
    $.fn.quicksandpaginated = function( options ){
		
		var configs = {
			wrapper: ".portfolioListing",
			container: '.fn-portfolioCarrousel',
			containerWidth:745,
			thumbs: "article",
			filtersContainer: ".portfolio-filters",
			filters: "li",
			prev: ".portfolio-page-prev",
			next: ".portfolio-page-next",
			pageNumberContainer: ".portfolio-page-numbers",
			hoverContainers: ".portfolio-thumb-overlay",
			thumbsHeight:186,
			thumbsWidth:248,
			transitionSpeed:500,
            callback:function(c) {}
		}
		$.extend( configs, options );
		
		$wrapper = $(configs.wrapper);
		
		$wrapper.each(function(index){
            var $this = $(this);
            $this.find(configs.container).attr("id", "portfolio-list"+index);
			$this.find(configs.filtersContainer).attr("id", "portfolio-filters"+index);
			$this.find(configs.prev).attr("id", "portfolio-page-prev"+index); 
			$this.find(configs.next).attr("id", "portfolio-page-next"+index);
			$this.find(configs.pageNumberContainer).attr("id", "portfolio-page-numbers"+index);
			var adjustHeight = $this.find(configs.container).data("ajust-height");
			var settings = {
				container: '#portfolio-list'+index,
				containerWidth: configs.containerWidth,
				thumbs: configs.thumbs, //element tag name only no id or class selector
				masterListcontainer: "#"+$this.data("rel-list"),
				filtersContainer: '#portfolio-filters'+index,
				filters: configs.filters, // must contain an anchor
				prev: "#portfolio-page-prev"+index,
				next: "#portfolio-page-next"+index,
				pageNumberContainer: "#portfolio-page-numbers"+index,
				hoverContainers: configs.hoverContainers,
				adjustHeight: configs.adjustHeight || adjustHeight || false,
				thumbsHeight:configs.thumbsHeight,
				thumbsWidth:configs.thumbsWidth,
				transitionSpeed:configs.transitionSpeed,
                callback:configs.callback
			};
			
			quickSandPaginated(settings);
		});
		
		
        var $self = $(this);
       
		function quickSandPaginated( settings ){
			
			//TODO refactor this
			$(settings.container).append("<"+settings.thumbs+"><a><img width="+settings.thumbsWidth+" height="+settings.thumbsHeight+"/></a></"+settings.thumbs+">");

			var max_thumb_rows = $(settings.container).height()/settings.thumbsHeight; // items causing additional rows trigger pagination
			var button_prev_disabled = true;
			var button_next_disabled = false;
			// Hide category filters if there is only one category (or none)
			var category_controls_hidden = false;
			if ($(settings.filtersContainer).find(settings.filters).size() <= 2) { // 2 because "All" is always present
				$(settings.filtersContainer).hide();
				category_controls_hidden = true;
			}
			
			// Necessary data
			
			var portfolio_width = $(settings.container).width();
			var thumbs_per_row = Math.floor(portfolio_width / settings.thumbsWidth);
			var max_thumbs_per_page = thumbs_per_row * max_thumb_rows;
			
			console.log($(settings.container+" "+settings.thumbs),"portfolio_width",portfolio_width, "thumbs_per_row", thumbs_per_row, "max_thumbs_per_page",max_thumbs_per_page);
			
			// Update thumbnails and controls based on given filter and/or page number
			var portfolio_filtered_urls = [];
			var portfolio_filtered_titles = [];
			var portfolio_filtered_descs = [];


			function updatePortfolio(filter_category, page, no_quicksand) {       //TODO: this function need to be break in pieces
		
				
				// Prepare page number and category filter
				var page = !page ? 1 : parseInt(page);
				
				// Force instantaneous transition of thumbs for IE 7
				//if (ie == 7) {
					//no_quicksand = true;
				///}
			
				// Create temporary hidden UL if there is none (first click)
				if (!$(settings.container+'-temp').length) {
					$('body').append('<ul id="'+settings.container.substr(1)+'-temp" class="hidden"></ul>');
				} else {
					$(settings.container+'-temp').empty(); // empty temp first in case already existed
				}
				
				// Copy LI's that belong to clicked category from master list to temporary list
				var filter_selector = settings.masterListcontainer+' '+settings.thumbs; // all
				if (filter_category) { // specific category
					filter_selector += '[data-categories*="' + filter_category + '"]';
				}
				$(filter_selector).clone().appendTo(settings.container+'-temp');
				
				// Store data for all pages of filtered data for lightbox navigation
				portfolio_filtered_urls.length = 0; // empty first
				portfolio_filtered_titles.length = 0;
				portfolio_filtered_descs .length = 0;
				$.each($(settings.container+'-temp '+settings.thumbs), function(index, li) { 
					portfolio_filtered_urls[index] = $('a', li).attr('href') ? $('a', li).attr('href') : '';
					portfolio_filtered_titles[index] = $(settings.hoverContainers, li).html() ? $(settings.hoverContainers, li).html() : '';
					//portfolio_filtered_descs[index] = $('.portfolio-description', li).html() ? $('.portfolio-description', li).html() : '';
				});
		
				// Calculate total and pages based on row limit and category filter
				var total_thumbs = $(settings.container+'-temp '+settings.thumbs).length;
				var total_pages = Math.ceil(total_thumbs / max_thumbs_per_page);
				
				// Splice entries for specified page so only those will show
				var splice_start = (page * max_thumbs_per_page) - max_thumbs_per_page;
				var splice_end = splice_start + max_thumbs_per_page - 1;
				if (splice_end > total_thumbs) {
					splice_end = total_thumbs;
				}
				$(settings.container+'-temp '+settings.thumbs+':lt(' + splice_start + '), '+settings.container+'-temp '+settings.thumbs+':gt(' + splice_end + ')').remove();
				
				// Update pagination controls and data
				$(settings.pageNumberCurrentId).text(page); // page numbering
				$(settings.pageNumberTotalId).text(total_pages);
				
				$(settings.pageNumberContainer).html("<ul/>");
				
				for(var i=1;i<=total_pages;i++){
					if(page === i){
						$(settings.pageNumberContainer+" ul").append('<li><span>'+i+'</span></li>');
					}else{
						$(settings.pageNumberContainer+" ul").append('<li><a href="#" data-page="'+i+'">'+i+'</a></li>');
					}
				}
				
				$(settings.pageNumberContainer+' a').unbind("click");
				$(settings.pageNumberContainer+' a').click(function(event) {
			
					// stop regular click action
					event.preventDefault();
					
					
					// Update thumbs and pagination controls based on current filter and page number
					var current_filter = $('.active').attr('data-category');
					var new_page = $(this).attr('data-page');
					
					updatePortfolio(current_filter, new_page);
							
					
			
				});
				
				
				if (total_pages > 1) {
		
					// Enable display of page numbers
					$(settings.pageNumberContainer+", "+settings.prev+", "+settings.next).show();
					
					// Disable previous button if on first page
					button_prev_disabled = false;
					$(settings.prev).removeClass('page-button-disabled');
					if (page == 1) {
						button_prev_disabled = true;
						$(settings.prev).addClass('page-button-disabled');
					}	
					
					// Disable next button if on last page
					button_next_disabled = false;
					$(settings.next).removeClass('page-button-disabled');
					if (page == total_pages) {
						button_next_disabled = true;
						$(settings.next).addClass('page-button-disabled');
					}	
		
		
					// Set new prev and next data on controls
					$(settings.prev).attr('data-page', page - 1);
					$(settings.next).attr('data-page', page + 1);
					
				} else {
				
					// Hide page controls if only 1 page
					$(settings.pageNumberContainer+", "+settings.prev+", "+settings.next).hide();
					
				}
			
				// Make sure title overlays are hidden if this is not first load
				if (portfolio_loaded) {
					$(settings.hoverContainers).hide();
				}
				
				// Show modified list of thumbs with Quicksand effect (http://razorjack.net/quicksand/)
				if (!no_quicksand) {
				
					// Execute the Quicksand replacement effect for thumbs to show filtered/paginated results
					// #portfolio-list items is replaced by hidden #portfolio-list-temp items
					$(settings.container).quicksand($(settings.container+'-temp '+settings.thumbs), {
						duration: settings.transitionSpeed,
						useScaling: false,
						adjustHeight : settings.adjustHeight, // causes filters/page nav to slide up/down smoothly
                        enhancement:settings.callback
					});
					
				} else {
				
					// Instantaneous
					$(settings.container).empty().append($(settings.container+'-temp '+settings.thumbs));
		
				}
				
				 
		
			}
			
			// Activate title overlay hover effect
			$(settings.container).delegate(settings.thumbs, 'mouseenter', function() {		
				
					$(settings.hoverContainers, this)
						.stop(true, true) // helps prevent overlays from getting stuck on super-fast mouse outs
						.fadeIn(fade_speed(settings.transitionSpeed))
						.css('display', 'table'); // to assist w/vertical centering
		
			}).delegate(settings.thumbs, 'mouseleave', function() {
					
					$(settings.hoverContainers, this).hide();
					
			});
				
			// Initial portfolio state	
			var portfolio_loaded = false;
			if (!$(settings.masterListcontainer).length) {
			
				// Auto-set data-id for each LI as index
				// this is as if we manually set each like <li data-id="1">, 2, 3, etc.
				$(settings.container).find(settings.thumbs).each(function(index) {
					$(this).attr('data-id', index);
				});
			
				// Create master list if there is none
				// this master list remains untouched forever to assist w/filtering and pagination
				$('body').append('<ul id="'+settings.masterListcontainer+'" class="hidden"></ul>');
				$(settings.container).find(settings.thumbs).clone().appendTo(settings.masterListcontainer);
		
		
			}

            $(settings.masterListcontainer).find(settings.thumbs).each(function(index) {
                $(this).attr('data-id', index);
            });

			updatePortfolio($(settings.filtersContainer).find('a.active').attr('data-category') || false, 1, false);
			portfolio_loaded = true;
		
			// Category filter click
			$(settings.filtersContainer).find('a').click(function(event) {
			
				event.preventDefault(); // stop regular click action
				
				// Clicks work only after page load effects are complete
				
				
					// Highlight clicked link
					$(settings.filtersContainer).find('a').removeClass('active');
					$(this).addClass('active');
					
					// Update thumbnails to match category filter, return to page 1
					updatePortfolio($(this).attr('data-category'));
		
				
				
			});
			
			// Page button click
			$(settings.prev+", "+settings.next).unbind("click");
			$(settings.prev+", "+settings.next).click(function(event) {
		
				// stop regular click action
				event.preventDefault();
				
				// detect if prev or next based on ID of $(this)
				var button_id = "#"+$(this).attr('id');
				var button_direction = button_id == settings.prev ? 'prev' : 'next';
				
				// if not on page 1 and clicked previous
				// and if not on last page and clicked next
				if (!(button_direction == 'prev' && button_prev_disabled) && !(button_direction == 'next' && button_next_disabled)) {
				
					// Update thumbs and pagination controls based on current filter and page number
					var current_filter = $('.active').attr('data-category');
					var new_page = $(this).attr('data-page');
					
					
					updatePortfolio(current_filter, new_page, false);
						
				}
		
			});
			
			
			
			// Adjust fade speed values for IE 7 and 8 which give clunky appearance
			function fade_speed(v) {
		
					//if (ie == 7 || ie == 8) {
						//v = 0; // instant
					//}
			
				return v;
			
			}
		}
	}

})(jQuery);



