/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.view.MainView", {

    extend: "Ext.navigation.View",
    xtype: 'mainview',
    fullscreen: true,

    initialize: function() {
        console.log("main view");
        console.log(this);
    },

    config: {

        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'addPostBtn',
                    text: 'Add post',
                    align: 'right',
                    hidden: false,
                    listeners: {
                        tap: function(btn, e, eOpts) {
                            console.log("add post btn");
                            this.fireEvent("addPost", this);
                        },
//                        initialize: function(btn, eOpts) {
//                            console.log("add post btn init");
//                        }
                    }

                }

            ]
        },
        items: [
            {
                xtype: 'list',
                title: 'Mobile Blog',
                itemTpl: '<div class="list-item-title">{title} - {id}</div><div class="list-item-narrative">{content}</div>',
                store: 'posts',
                listeners: {
                    itemtap: function(list, index, target, record, e, eOpts ) {
                        this.fireEvent("showBlogPost", this, record);
                    }
                },
                onItemDisclosure: function (record, btn, index) {
                    console.log("disclosure");
                    this.fireEvent("showBlogPost", this, record);
                },

            }
        ]
    }
});