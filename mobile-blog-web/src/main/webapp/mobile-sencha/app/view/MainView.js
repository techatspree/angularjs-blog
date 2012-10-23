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
                    text: 'Add Post',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    id: 'addCommentBtn',
                    text: 'Add Comment',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    id: 'loginBtn',
                    text: 'Login',
                    align: 'right',
                    hidden: true
                },
                {
                    xtype: 'button',
                    id: 'registerBtn',
                    text: 'Register',
                    align: 'right',
                    hidden: true
                }
            ]
        }
    }

});
