/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.controller.BlogListController", {
    extend: "Ext.app.Controller",

    config: {
        refs: {
            mainContainer: '#mainContainer',
            mainView: '#mainView',
            navBar: '#navBar',
            blogListView: '#blogListView',
            blogPostView: '#blogPostView',
            blogList: '#blogList',
        },
        control: {
            blogListView: {
                initialize: 'initBlogListView'
            },
            blogList: {
                itemtap: 'onItemTap'
            },
            addPostBtn: {
                initialize: 'initAddPostBtn',
                tap: 'onAddPostBtnTap'
            },
            loginBtn: {
                initialize: 'initLoginBtn',
                tap: 'onLoginBtnTap'
            }
        }
    },

    initBlogListView: function(panel, eOpts) {
        var blogList = Ext.ComponentQuery.query('#blogListView list'),
            navBar = this.getNavBar();

        var bar = this.getMainView().getNavigationBar();
        bar.titleComponent.setTitle("test");

        if (blogList[0]) {
            blogList[0].setStore('blogPostsStore');
        }


    },



    onItemTap: function(list, index, target, record, e, eOpts) {
        list.fireEvent("showBlogPost", list, index, target, record, e, eOpts);
    }

});