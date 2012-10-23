/**
 * @author Till Hermsen
 * @date 22.10.12
 */
Ext.define("Blog.controller.BlogPostController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
              mainView: '#mainView',
              blogPostView: { selector: "panel[id='blogPostView']" }

        },
        control: {
            blogPostView: {
                activate: 'activateBlogPostView'
            },
            "list": {
                showBlogPost: 'showBlogPost'
            }

        }
    },

    showBlogPost: function(record) {
        // blog post view
        var view     = Ext.create("Blog.view.BlogPostView"),
            store    = Ext.data.StoreManager.lookup('blogPostStore'),
            mainView = this.getMainView();

        store.applyData(record.data);
        this.getBlogPostView().setTitle(record.data.title);


        // load comments
        // set store url
        // load store


        mainView.push(view);
    },

    activateBlogPostView: function(panel, newActiveItem, oldActiveItem, eOpts) {
        var buttons = [
            { "id": 'loginBtn', "requireUser": false},
            { "id": 'addCommentBtn', "requireUser": true}
        ];

        panel.fireEvent("showButtons", buttons, panel);
//        panel.setTitle()
    }

});
