/**
 * The central app object registers all h-ubu components.
 *
 * @author Philipp Kumar
 */
var App = {

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
            .registerComponent(registerScreen, {
                name: 'registerScreen'
            })
            .registerComponent(blogListScreen, {
                name: 'blogListScreen',
                selectors: {
                    blogPostList: '#blogPostList'
                }
            })
            .registerComponent(blogPostScreen, {
                name: 'blogPostScreen',
                selectors: {
                    blogPostContainer: '#blogPostContainer',
                    commentList:       '#commentList'
                }
            })
            .registerComponent(addPostScreen, {
                name: 'addPostScreen'
            })
            .registerComponent(addCommentScreen, {
                name: 'addCommentScreen'
            })
            .start();
	}

};
