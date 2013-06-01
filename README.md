#QuickSand With Pagination : 
quicksandpaginated.jquery.js

## Extention to Jquery Quicksand : 
http://razorjack.net/quicksand/docs-and-demos.html

Required: 

    * jquery.js (more than jQuery 1.3+),
    * jquery-migrate.js (if jQuery 1.9 is use),
    * jquery.quicksand.js : http://razorjack.net/quicksand/docs-and-demos.html


Install: 
    
    bower install quicksandpaginated.jquery.js

How to use : 

Script:

    $(function(){ 
        $(".portfolioListing").quicksandpaginated({ 
            
            wrapper: ".largerContainer", 
            // larger container need to contain the inner container were element are display 
            and a container with the filters must have a data-rel-list="master-list". 
            master-list= div id with list of element to show         
            
            container: '.displayArea', 
            //inner container that will show elements 
            
            containerWidth:745, 
            // width of the inner container 
            
            thumbs: "article", 
            // selector of element in the list to show : must have a data-categories="Games Utility" 
            with the list of filters in which element shoud be shown and must be in the #master-list 
            
            filtersContainer: ".filters", 
            // filter container 
            
            filters: "li", 
            // filter elements, must have an anchor with data-category="Photography" 
            with the filter name which will be the link with the data-categories="Photography Utility" 
            on elements to show 
            
            prev: ".prev", 
            // prev nav selector 
            
            next: ".next", 
            // next nav selector 
            
            pageNumberContainer: ".nav", 
            // selector pointing to a div where the nav will be rendered 
            
            thumbsHeight:186, 
            // element to show Height 
            
            thumbsWidth:248, 
            // element to show Width 
            
            transitionSpeed:400, 
            // transition Speed 
            
            callback:function(c) { c.trigger("complete"); } 
            // callback when filter have been applied, c is the container (.displayArea in the example) 
            
        });

    });

Markup:
    
    <section class="largerContainer" data-rel-list="master-list" style="height:600px">
    
        <ul class="filters">
            <li><a data-category="Education">Education</a></li>
            <li><a data-category="Utility">Utility</a></li>
            <li><a data-category="Photography">Photography</a></li>
            <li><a class="active">All</a></li>
            <!-- the class active will show this filter on loading, 
            no data-category means all filters -->
        </ul>
        
        <div class="displayArea"  style="height:600px"></div>
        <!-- height required and data-ajust-height="false" can determinate 
        if the container will ajust to content or not -->
        
        <div>        
            <div class="nav">
               <!-- pagination will be added here with page number -->
            </div>
            <a href="#" class="prev page-button-disabled" data-page="0"><span class="caption">Prev</span><span class="hover"></span></a>
            <a href="#" class="next" data-page="2"><span class="caption">Next</span><span class="hover"></span></a>
        </div>
    
        <div id="master-list" class="hidden">
            <article data-categories="Education Utility">
                <img width="248" height="186" src="img/dummy-portfolio-preview.jpg">
                <span>Project Title</span>               
            </article>
            <article data-categories="Photography">     
                <img width="248" height="186" src="img/dummy-portfolio-preview.jpg">
                <span>Project Title</span>               
            </article>
        </div>
    </section>
    
    <script src="../components/jquery/jquery.js"></script> <!-- version 1.9 -->
    
    <script src="../components/jquery/jquery-migrate.js"></script> <!-- required only if jquery version 1.9 -->
    
    <script src="../components/jquery.quicksand.js/jquery.quicksand.js"></script>
    
    <script src="../quicksandpaginated.jquery.js"></script>

See examples in examples folder.

More Doc and examples will follow...




[Etienne Dion (C) 2013](http://etiennedion.com)

