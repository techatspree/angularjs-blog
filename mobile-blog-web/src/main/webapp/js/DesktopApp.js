/**
 * The central app object registers all h-ubu components.
 *
 * @author Till Hermsen
 */
App = {

    init: function() {
        // h-ubu components registration
        hub.registerComponent(templateManager, {
                name: 'templateManager',
                templateNames: [
                    'BlogListEntry',
                    'BlogEntry',
                    'Comment',
                    'DesktopLoginForm',
                    'DesktopRegisterForm',
                    'DesktopAddPostForm',
                    'DesktopFormValidationError',
                    'DesktopCommentForm',
                    'DesktopBlogPost',
                    'DesktopError'
                ]
            })
            .registerComponent(bootstrap, {
                name: 'bootstrap'
            })
            .registerComponent(router, {
                name: 'router'
            })
            .registerComponent(errorView, {
                name: 'errorView',
                selectors: {
                    content: '#content'
                },
                templates: {
                    error: '#desktop-error-tmpl'
                }
            })
            .registerComponent(blogPostBackend, {
                name:'blogPostBackend'
            })
            .registerComponent(blogPostFrontend, {
                name:   'blogPostFrontend',
                device: 'desktop',
                selectors: {
                    contentContainer:  '#content',
                    blogPostContainer: '#blogPostContainer',
                    commentsContainer: '#commentList'
                },
                templates: {
                    blogListPost: "#bloglistentry-tmpl",
                    blogPost: "#blogentry-tmpl",
                    comment: "#comment-tmpl"
                }
            })
            .registerComponent(mainView, {
                name: 'mainView',
                selectors: {
                    loginLogoutBtn:    "#loginLogoutBtn",
                    loginSubmitBtn:    "#loginSubmitBtn",
                    registerBtn:       "#registerBtn",
                    registerSubmitBtn: "#registerSubmitBtn",
                    userContainer:     "#user"
                }
            })
            .registerComponent(loginSubView, {
                name: 'loginSubView',
                selectors: {
                    userContainer: '#user',
                    loginForm: '#loginForm',
                    error: '#errorLogin'
                },
                templates: {
                    loginForm: '#desktop-loginform-tmpl',
                    formValidationError: '#desktop-formvalidationerror-tmpl'
                }
            })
            .registerComponent(blogListView, {
                name:      'blogListView',
                selectors: {
                    addPostBtn:'#addPostBtn'
                }
            })
            .registerComponent(blogPostView, {
                name: 'blogPostView',
                selectors: {
                    content:          '#content',
                    blogPostContainer:'#blogPostContainer',
                    commentList:      '#commentList',
                    commentForm:      '#addCommentForm',
                    commentTextarea:  '#commentTextarea',
                    submitCommentBtn: '#submitCommentBtn'
                },
                templates:    {
                    blogPost:   "#desktop-blogpost-tmpl",
                    commentForm:"#desktop-commentform-tmpl"
                }
            })
            .registerComponent(addPostView, {
                name: 'addPostView',
                selectors: {
                    content: '#content',
                    addPostForm: '#addPostForm'
                },
                templates: {
                    addPostForm: "#desktop-addpostform-tmpl"
                }
            })
            .start();
    }

};
