/**
 * The central app object registers all h-ubu components.
 *
 * @author Till Hermsen
 */
var App = {

    init: function() {
        // h-ubu components registration
        hub.registerComponent(templateManager, {
                name: 'templateManager',
                templateNames: [
                    'BlogListPost',
                    'BlogPost',
                    'Comment',
                    'DesktopMain',
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
            .registerComponent(errorController, {
                name: 'errorController'
            })
            .registerComponent(userService, {
                name: 'userService'
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
                    blogListPost: "#bloglistpost-tmpl",
                    blogPost:     "#blogpost-tmpl",
                    comment:      "#comment-tmpl"
                }
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
            .registerComponent(mainView, {
                name: 'mainView',
                selectors: {
                    body:              "body",
                    loginLogoutBtn:    "#loginLogoutBtn",
                    loginSubmitBtn:    "#loginSubmitBtn",
                    registerBtn:       "#registerBtn",
                    registerSubmitBtn: "#registerSubmitBtn",
                    userContainer:     "#user"
                },
                templates: {
                    main: '#desktop-main-tmpl'
                }
            })
            .registerComponent(loginSubView, {
                name: 'loginSubView',
                selectors: {
                    userContainer: '#user',
                    loginForm:     '#loginForm',
                    error:         '#errorLogin'
                },
                templates: {
                    loginForm:           '#desktop-loginform-tmpl',
                    formValidationError: '#desktop-formvalidationerror-tmpl'
                }
            })
            .registerComponent(registerSubView, {
                name: 'registerSubView',
                selectors: {
                    userContainer:  '#user',
                    registerForm:   '#registerForm',
                    inputUser:      '#inputUser',
                    inputPass:      '#inputPass',
                    inputFirstname: '#inputFirstname',
                    inputSurname:   '#inputSurname',
                    inputEmail:     '#inputEmail',
                    inputPhone:     '#inputPhone',
                    errorUser:      '#errorUser',
                    errorPass:      '#errorPass',
                    errorFirstname: '#errorFirstname',
                    errorSurname:   '#errorSurname',
                    errorEmail:     '#errorEmail',
                    errorPhone:     '#errorPhone'
                },
                templates: {
                    registerForm:        '#desktop-registerform-tmpl',
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
                    content:           '#content',
                    blogPostContainer: '#blogPostContainer',
                    commentList:       '#commentList',
                    commentForm:       '#addCommentForm',
                    commentTextarea:   '#commentTextarea',
                    submitCommentBtn:  '#submitCommentBtn'
                },
                templates:    {
                    blogPost:    "#desktop-blogpost-tmpl",
                    commentForm: "#desktop-commentform-tmpl"
                }
            })
            .registerComponent(addPostView, {
                name: 'addPostView',
                selectors: {
                    content:      '#content',
                    addPostForm:  '#addPostForm'
                },
                templates: {
                    addPostForm: "#desktop-addpostform-tmpl"
                }
            })
            .registerComponent(addCommentSubView, {
                name: 'addCommentSubView',
                selectors: {
                    commentList:     '#commentList',
                    commentForm:     '#addCommentForm',
                    commentTextarea: '#commentTextarea'
                },
                templates: {
                    commentForm: '#desktop-commentform-tmpl'
                }
            })
            .start();
    }

};
