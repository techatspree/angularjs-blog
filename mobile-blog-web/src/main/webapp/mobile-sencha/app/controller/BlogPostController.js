/**
 * @author Till Hermsen
 * @date 22.10.12
 */
Ext.define("Blog.controller.BlogPostController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
              mainView: '#mainView',
              blogPostView: { selector: "panel[id='blogPostView']" },
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

//        console.log(record.data);
//
//
//        record.data.created = new Date(record.data.created).toUTCString();

        store.applyData(record.data);
        this.getBlogPostView().setTitle(record.data.title);


        // load comments
        // set store url
        // load store

        console.log(this.getCommentsStore);


        var store = Ext.data.StoreManager.get('commentsStore');
//                    store.setProxy({
//                        type: 'rest',
//                        url: '../rest/blog/17/comment'
//                    });

        console.log(store.getProxy().getUrl());

        store.getProxy().setUrl(store.getProxy().getUrl().replace('{id}', record.internalId));



//        store._proxy._url = store._proxy._url.replace('{id}', record.internalId);

        store.load();
//                    console.log("Comments: ");
//                    console.log(store);

//        var data = record.data;
//
//        data['comments'] = store.getData();
//
//
//        console.log("Data:");
//        console.log(data);






        mainView.push(view);
    },

    activateBlogPostView: function(panel, newActiveItem, oldActiveItem, eOpts) {
        var buttons = [
            { "id": 'loginBtn', "requireUser": false},
            { "id": 'addCommentBtn', "requireUser": true}
        ];

        panel.fireEvent("showButtons", buttons, panel);
//        panel.setTitle()

        var store = Ext.data.StoreManager.get('commentsStore');
        store.load();
    }

});
