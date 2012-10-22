/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.view.MainView", {
    extend: "Ext.navigation.View",
    id: 'mainView',

    requires: [
        'Ext.Button'
    ],

    config: {
        fullscreen: true,

        navigationBar: {
            id: 'navBar',
            items: [
                {
                    xtype: 'button',
                    id: 'addPostBtn',
                    text: 'Add post',
                    align: 'right',
                    hidden: false
                },
                {
                    xtype: 'button',
                    id: 'addCommentBtn',
                    text: 'Add comment',
                    align: 'right',
                    hidden: false
                },
                {
                    xtype: 'button',
                    id: 'loginBtn',
                    text: 'Login',
                    align: 'right',
                    hidden: false
                }
            ]
        }
    },

    initialize: function() {
        this.callParent(arguments);
    }
});