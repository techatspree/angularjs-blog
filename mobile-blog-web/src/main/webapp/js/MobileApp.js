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
                    'BlogListPost',
                    'BlogPost',
                    'Comment'
                ]
            })
            .registerComponent(bootstrap, {
                name: 'bootstrap'
            })
            .registerComponent(userService, {
                name: 'userService'
            })
            .registerComponent(blogPostBackend, {
                name: 'blogPostBackend'
            })
            .registerComponent(blogPostFrontend, {
                name:   'blogPostFrontend',
                device: 'mobile',
                selectors: {
                    contentContainer:  '#blogPostList',
                    blogPostContainer: '#blogPostContainer',
                    commentsContainer: '#commentList'
                },
                templates: {
                    blogListPost: "#bloglistpost-tmpl",
                    blogPost:     "#blogpost-tmpl",
                    comment:      "#comment-tmpl"
                }
            })
            .registerComponent(mainScreen, {
                name: 'mainScreen'
            })
            .registerComponent(loginScreen, {
                name: 'loginScreen'
            })
            .registerComponent(blogListScreen, {
                name: 'blogListScreen'
            })
            .registerComponent(blogPostScreen, {
                name: 'blogPostScreen'
            })
            .registerComponent(addPostScreen, {
                name: 'addPostScreen'
            })
            .registerComponent(registerScreen, {
                name: 'registerScreen'
            })
            .start();
	}

};
