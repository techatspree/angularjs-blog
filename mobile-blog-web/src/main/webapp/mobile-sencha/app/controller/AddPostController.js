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
            addPostView: { selector: 'formpanel[id="addPostView"]'}
        },
        control: {
            addPostBtn: {
                tap: "showAddPostView"
            },
            addPostView: {
                activate: 'onActivateAddPostView'
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
    }


});