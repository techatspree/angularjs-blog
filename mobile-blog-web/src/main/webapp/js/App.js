App = {
	load: function() {
		jo.load();
		
		document.body.addEventListener('touchmove', function(e) {
		    e.preventDefault();
			joEvent.stop(e);
		}, false);
		
		// this is a more complex UI with a nav bar and a toolbar
		this.scn = new joScreen(
			new joContainer([
				new joFlexcol([
					this.nav = new joNavbar(),
					this.stack = new joStackScroller()
				]),
				this.toolbar = new joToolbar(
				    new joView("AeroGear Blog Demo, v1.0")
				)
			]).setStyle({position: "absolute", top: "0", left: "0", bottom: "0", right: "0"})
		);
		
		this.nav.setStack(this.stack);
		
		// First screen to present
		this.stack.push(joCache.get("BlogListView"));
		
		joGesture.backEvent.subscribe(this.stack.pop, this.stack);
	},

	currentBlogPostId: 0,

	openBlogPost: function(id) {
	    this.currentBlogPostId = id;
	    this.stack.push(joCache.get("BlogEntryView"));
	}
};
