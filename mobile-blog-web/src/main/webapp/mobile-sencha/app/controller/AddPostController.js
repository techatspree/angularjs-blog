/**
 * @author Till Hermsen
 * @date 23.10.12
 */
Ext.define("Blog.controller.AddPostController", {

    extend: "Ext.app.Controller",

    config: {
        refs: {
            mainView: { selector: '#mainView' },
            addPostBtn: { selector: 'button[id="addPostBtn"]' },
            addPostView: { selector: 'formpanel[id="addPostView"]'},
            addPostSubmit: { selector: 'button[id="addPostSubmitBtn"]' }
        },
        control: {
            addPostBtn: {
                tap: "showAddPostView"
            },
            addPostView: {
                activate: 'onActivateAddPostView'
            },
            addPostSubmit: {
                tap: "onSubmit"
            }
        }
    },

    showAddPostView: function() {
        var view     = Ext.create("Blog.view.AddPostView"),
            mainView = this.getMainView();

        mainView.push(view);
    },

    onActivateAddPostView: function(self) {
        var buttons = [];
        self.fireEvent("showButtons", buttons);

        self.setTitle("Add Post");
    },

    onSubmit: function() {
        var userService = this.getApplication().getController('UserServiceController');
        var blogPostService = this.getApplication().getController('BlogPostServiceController');

        var formData = this.getAddPostView().getValues();

        formData.author = {};
        formData.author.id = userService.getUser().id;

        var mainView = this.getMainView();

        var callback = function() {
            mainView.pop();
        };

        var errorCallback = function() {
            Ext.Msg.alert('Add Post', 'error', Ext.emptyFn);
        }

        blogPostService.addBlogPost(formData, callback, errorCallback);
    }


});