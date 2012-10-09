/**
 * The central app object registers all h-ubu components.
 *
 * @author Philipp Kumar
 */
App = {

	/**
	 * Registers all h-ubu components.
	 */
	init: function() {
        // Component registrations
        hub .registerComponent(templateManager, {
                name: 'templateManager',
                templateNames: [
                    'BlogListEntry',
                    'BlogEntry',
                    'Comment'
                ]
            })
            .registerComponent(bootstrap, {
                name: 'bootstrap'
            })
            .registerComponent(mainScreen, {
                name: 'mainScreen'
            })
            .registerComponent(blogPostBackend, {
                name: 'blogPostBackend'
            })
            .registerComponent(blogPostFrontend, {
                name: 'blogPostFrontend',
                contentContainer: '#blogEntryList',
                blogPostContainer: '#blogEntryContainer',
                commentsContainer: '#commentList'
            })
            .start();
	},

    // needs refactoring!!
	openBlogPost: function(id) {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

	    mainContainer.stack.push(App.BlogPostScreen.get());
	    App.BlogPostScreen.refresh(id);
	}

};
