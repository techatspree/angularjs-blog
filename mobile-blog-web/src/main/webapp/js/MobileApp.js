/*
 * The central app object.
 *
 * @author Philipp Kumar
 */
App = {
     // Fetches all HTML templates and adds them to our DOM
	fetchTemplates: function() {
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

		// Load jo framework for our mobile UI.
		// In jo, the UI is defined entirely via JavaScript.
		jo.load();
		
        // The following reduces delay when tapping on views.
		document.body.addEventListener('touchmove', function(e) {
		    e.preventDefault();
			joEvent.stop(e);
		}, false);
		

		// Defines our general UI with a navigation bar and a so-called stack.
		// With this stack, we can put screens on top of each other,
		// allowing us to navigate back to screens we have already visited
		// by popping the current screen off the stack.
		this.scn = new joScreen(
			new joContainer([
				new joFlexcol([
    			    this.nav = new joCustomNavbar(),
					this.stack = new joStackScroller()
				]),
			]).setStyle({position: "absolute", top: "0", left: "0", bottom: "0", right: "0"})
		);
		
		this.nav.setStack(this.stack);
		this.nav.setTitle('<img src="../images/aerogear_logo_150px.png" class="logo" /> ');
		this.nav.row.push('<img id="akquinetLogo" src="../images/akquinet_logo.png" class="logo" style="float:right" /> ');

		joGesture.backEvent.subscribe(this.stack.pop, this.stack);

        // Push our first screen on the stack: The blog post list.
		this.stack.push(App.BlogListScreen.get());
        // Load the blog posts.
        App.BlogListScreen.refresh();

        $('#akquinetLogo').onpress(function(){
            document.location.href = "http://blog.akquinet.de/";
            window.location.href = "http://blog.akquinet.de/";
        });
	},

	openBlogPost: function(id) {
	    this.stack.push(App.BlogPostScreen.get());
	    App.BlogPostScreen.refresh(id);
	}
};
