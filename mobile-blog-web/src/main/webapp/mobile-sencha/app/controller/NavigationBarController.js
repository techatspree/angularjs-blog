/**
 * @author Till Hermsen
 * @date 23.10.12
 */
Ext.define("Blog.controller.NavigationBarController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
            panelEvent: 'panel'
        },
        control: {
            panelEvent: {
                showButtons: 'showButtons'
            }
        }
    },

    showButtons: function(buttons, panel) {
        var userService = this.getApplication().getController('UserServiceController');

        this.hideAllButtons();

        Ext.Object.each(buttons, function(key, item, scope) {
            var button = Ext.getCmp(item.id);

            if (item.requireUser) {
                if(userService.isLoggedIn()) {
                    button.show();
                }
            } else {
                if(!userService.isLoggedIn()) {
                    button.show();
                }
            }
        });
    },

    hideAllButtons: function() {
        var buttons = Ext.ComponentQuery.query('#navBar button');

        Ext.Array.each(buttons, function(item, index) {
            item.hide();
        });
    }

});
