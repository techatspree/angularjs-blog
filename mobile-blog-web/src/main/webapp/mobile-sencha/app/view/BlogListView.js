/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.BlogListView", {
    extend: "Ext.Panel",
    xtype: 'bloglistview',

    requires: [
        'Ext.dataview.List'
    ],

    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Mobile-Blog',
                items: [
                    {xtype: 'spacer'},
                    {
                        xtype: 'button',
                        id: 'loginBtn',
                        align: 'right',
                        text: 'Login',
                        hidden: false
                    },
                    {
                        xtype: 'button',
                        id: 'addPostBtn',
                        align: 'right',
                        text: 'Add post',
                        hidden: false
                    }
                ]
            },
            {
                xtype: 'list',
                id: 'blogList',
                itemTpl: Ext.XTemplate.from(Ext.get('blogpostlist')),
                store: 'blogPostsStore',
                onItemDisclosure: true,
                flex: 1
            }
        ]
    }

});