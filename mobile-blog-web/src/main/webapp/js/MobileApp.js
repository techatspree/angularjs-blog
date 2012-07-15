/*
 * The central app object.
 */
App = {
	currentBlogPostId: 0,

	fetchTemplates: function() {
        // Fetch HTML template for blog entries
        $.ajax({
            url: "../js/template/BlogListEntry.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });

        $.ajax({
            url: "../js/template/BlogEntry.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });

        $.ajax({
            url: "../js/template/Comment.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });
	},

	postLoginAction: function() {},

	/*
	 * This is the entry point into the app.
	 */
	load: function() {
	    App.fetchTemplates();

		// Load jo framework for mobile UI.
		// jo defines UI via JavaScript.
		jo.load();
		
        // the following reduces delay when tapping on views
		document.body.addEventListener('touchmove', function(e) {
		    e.preventDefault();
			joEvent.stop(e);
		}, false);
		

		// Defines a UI with a navigation bar and a so-called stack.
		// The stack is capable of puuting screens on top of each other,
		// allowing us to navigate back to screens we have already visited
		// by popping the current screen off the stack.
		this.scn = new joScreen(
			new joContainer([
				new joFlexcol([
    			    this.nav = new joNavbar(),
					this.stack = new joStackScroller(),
				]),
			]).setStyle({position: "absolute", top: "0", left: "0", bottom: "0", right: "0"})
		);
		
		this.nav.setStack(this.stack);
		
		joGesture.backEvent.subscribe(this.stack.pop, this.stack);

        // First screen to present
		this.stack.push(App.BlogListScreen.get());
        App.BlogListScreen.refresh();
	},

	openBlogPost: function(id) {
	    this.currentBlogPostId = id;
	    this.stack.push(joCache.get("BlogEntryView"));
	}
};
