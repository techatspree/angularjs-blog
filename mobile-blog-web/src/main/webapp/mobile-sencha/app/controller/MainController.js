/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.controller.MainController", {

    extend: "Ext.app.Controller",
    requires: [
        'Blog.view.MainView'
    ],

    config: {
        refs: {
            mainContainer: '#mainContainer',
            mainView: '#mainView',
            loginBtn: '#loginBtn',
            addPostBtn: '#addPostBtn',
            addCommentBtn: '#addCommentBtn'
        },
        control: {
            mainContainer: {
                initialize: 'initMainContainer'
            },
            loginBtn: {
                initialize: 'initLoginBtn',
                tap: 'onLoginBtnTap'
            },
            addPostBtn: {
                initialize: 'initAddPostBtn',
                tap: 'onAddPostTap'
            },
            addCommentBtn: {
                initialize: 'initAddCommentBtn',
                tap: 'onAddCommentTap'
            }
        }
    },

    initMainContainer: function(container, eOpts) {
        // main view and blog list view
        var mainView = Ext.create('Blog.view.MainView'),
            blogListView = Ext.create('Blog.view.BlogListView');

        mainView.add(blogListView);
        this.getMainContainer().add([mainView]);
    },

    initLoginBtn: function(btn, eOpts) {
        var userService = this.getApplication().getController('UserServiceController');
        if (userService.isLoggedIn()) {
            btn.hide();
        }
    },
    onLoginBtnTap: function(btn, e, eOpts) {
        console.log("login button tapped");
        btn.fireEvent("showLoginView");
    },

    initAddPostBtn: function(btn, eOpts) {
        var userService = this.getApplication().getController('UserServiceController');
        if (!userService.isLoggedIn()) {
            btn.hide();
        }
    },
    onAddPostBtnTap: function(btn, e, eOpts) {
        btn.fireEvent("showAddPostView");
    },

    initAddCommentBtn: function(btn, eOpts) {
        var userService = this.getApplication().getController('UserServiceController');
        if (!userService.isLoggedIn()) {
            btn.hide();
        }
    },
    onAddCommentBtnTap: function(btn, e, eOpts) {
        btn.fireEvent("showAddCommentView");
    }

});