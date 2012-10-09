/**
 * The central app object registers all h-ubu components.
 *
 * @author Till Hermsen
 */
App = {

    init: function() {
        // Component registrations
        hub .registerComponent(templateManager, {
                name: 'templateManager',
                templateNames: [
                    'BlogListEntry',
                    'BlogEntry',
                    'Comment',
                    'DesktopLoginForm',
                    'DesktopRegisterForm',
                    'DesktopAddPostForm',
                    'DesktopLoginLogoutBtn',
                    'DesktopFormValidationError',
                    'DesktopAddPostBtn',
                    'DesktopCommentForm',
                    'DesktopBlogEntry'
                ]
            })
            .registerComponent(bootstrap, {
                name: 'bootstrap'
            })
            .registerComponent(router, {
                name: 'router'
            })
            .registerComponent(blogPostBackend, {
                name: 'blogPostBackend'
            })
            .registerComponent(blogPostFrontend, {
                name: 'blogPostFrontend',
                contentContainer: '#content',
                blogPostContainer: '#blogEntryContainer',
                commentsContainer: '#commentList'
            })
            .start();
    },

    // needs refactoring!!
	openBlogPost: function(id) {
        document.location.href = "?showPost=" + id;
    }

};
