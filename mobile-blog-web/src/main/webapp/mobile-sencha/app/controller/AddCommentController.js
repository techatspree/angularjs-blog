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
            addCommentSubmit: { selector: 'button[id="addCommentSubmitBtn"]' }
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
        var mainView, view;

        mainView = this.getMainView();
        view     = Ext.create("Blog.view.AddCommentView");

        mainView.push(view);
    },

    onActivateAddCommentView: function(self) {
        var buttons = [];
        self.fireEvent("showButtons", buttons);

        self.setTitle("Add Comment");
    },

    onSubmit: function() {
        var userService, blogPostService,
            mainView,
            formData,
            store, blogPostId;

        userService     = this.getApplication().getController('UserServiceController');
        blogPostService = this.getApplication().getController('BlogPostServiceController');

        mainView = this.getMainView();

        formData = this.getAddCommentView().getValues();

        store  = Ext.data.StoreManager.lookup('blogPostStore');
        blogPostId = store.getAt(0).data.id;

        formData.author = {};
        formData.author.id = userService.getUser().id;

        var callback = function() {
            mainView.pop();
        };

        var errorCallback = function() {
            Ext.Msg.alert('Add Comment', 'error', Ext.emptyFn);
        }

        blogPostService.addComment(blogPostId, formData, callback, errorCallback);
    }

});