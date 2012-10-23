/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.controller.BlogListController", {

    extend: "Ext.app.Controller",

    config: {
        refs: {
            blogList: { selector: 'panel list[id="blogList"]' },
            blogListView: { selector: "panel[id='blogListView']" }
        },
        control: {
            blogListView: {
                initialize: 'init',
                activate: 'activate'
            },
            blogList: {
                itemtap: 'onItemTap'
            }
        }
    },

    init: function(panel, eOpts) {
        var blogList = this.getBlogList();
        if (blogList) {
            blogList.setStore('blogPostsStore');
        }
    },

    activate: function(panel, newActiveItem, oldActiveItem, eOpts) {
        var buttons = [
            { "id": 'loginBtn', "requireUser": false},
            { "id": 'addPostBtn', "requireUser": true}
        ];

        panel.fireEvent("showButtons", buttons, panel);

        panel.setTitle("Mobile-Blog");
    },

    onItemTap: function(list, index, target, record, e, eOpts) {
        list.fireEvent("showBlogPost", record);
    }

});
