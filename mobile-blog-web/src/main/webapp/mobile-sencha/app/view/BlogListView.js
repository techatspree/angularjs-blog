Ext.define("Blog.view.BlogListView", {
    xtype: 'bloglistview',
    extend: 'Ext.Container',


    initialize: function() {
    },



    config: {
        layout: {
            type: 'card'
        },

        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Mobile Blog",
            },
            {
                xtype: 'list',
                itemId: 'blogList',
                store: "BlogPostsStore",
                onItemDisclosure: true,
                itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{content}</div>',
                listeners: {
//                    {
//                        event: "disclose",
//                        fn: "onBlogListDisclose"
//                    }
//                    disclose: function() {
//                        console.log(this);
//                        this.fireEvent("showBlogPost");
//                    }
                },
                onBlogListDisclose: function(list, record, target, index, e, eOpts) {
                    console.log("disclose");
                    this.fireEvent("showBlogPost", this, record);
                }

            }
        ],

        listeners: [

            {
                delegate: '#blogList',
                event: 'disclose',
                fn: function(list, record) {
                    console.log("event with deleagte");
                    this.fireEvent("showBlogPost", this, record);
                }
            }

        ]

    }

//    config: {
//
//        store: "BlogPostsStore",
//        onItemDisclosure: true,
//        itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{content}</div>',
//        listeners: [
//            {
//                event: "disclose",
//                fn: "onBlogListDisclose"
//            }
//        ]
//    },
//
//

});