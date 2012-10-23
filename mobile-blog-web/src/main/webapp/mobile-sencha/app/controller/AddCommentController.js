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
            addCommentView: { selector: 'formpanel[id="addCommentView"]' }
        },
        control: {
            addCommentBtn: {
                tap: 'showAddCommentView'
            },
            addCommentView: {
                activate: 'onActivateAddCommentView'
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
    }

});