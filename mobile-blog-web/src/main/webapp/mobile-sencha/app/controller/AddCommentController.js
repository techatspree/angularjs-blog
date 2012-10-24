/**
 * @author Till Hermsen
 * @date 23.10.12
 */
Ext.define("Blog.controller.AddCommentController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: { selector: '#mainView' },
            addCommentBtn: { selector: 'button[id="addCommentBtn"]' },
            addCommentView: { selector: 'formpanel[id="addCommentView"]' },
            addCommentSubmit: { selector: 'button[id="addCommentSubmitBtn"]' },
            blogPostIdField: { selector: 'hiddenfield[id="blogPostIdHiddenField"]' }
        },
        control: {
            addCommentBtn: {
                tap: 'showAddCommentView'
            },
            addCommentView: {
                activate: 'onActivateAddCommentView'
            },
            addCommentSubmit: {
                tap: 'onSubmit'
            }
        }
    },

    showAddCommentView: function() {
        var view     = Ext.create("Blog.view.AddCommentView"),
            mainView = this.getMainView();

        mainView.push(view);
    },

    onActivateAddCommentView: function(self) {
        var buttons = [];

        self.fireEvent("showButtons", buttons);

        self.setTitle("Add Comment");

        var blogPostIdField = this.getBlogPostIdField();

        var store = Ext.data.StoreManager.lookup('blogPostStore');

        console.log(store);

        var blogPost = store.getAt(0);

        console.log(blogPost);

        blogPostIdField.setValue(blogPost.data.id);
    },

    onSubmit: function() {
        var userService = this.getApplication().getController('UserServiceController');
        var blogPostService = this.getApplication().getController('BlogPostServiceController');

        var formData = this.getAddCommentView().getValues();

        formData.author = {};
        formData.author.id = userService.getUser().id;

        console.log(formData);

        var store = Ext.data.StoreManager.lookup('blogPostStore');

        console.log(store);

        var blogPost = store.getAt(0);

        console.log(blogPost);


        var blogPostId = blogPost.data.id;

        var mainView = this.getMainView();

        var callback = function() {
            mainView.pop();
        };

        var errorCallback = function() {
            Ext.Msg.alert('Add Comment', 'error', Ext.emptyFn);
        }

        blogPostService.addComment(blogPostId, formData, callback, errorCallback);
    }

});