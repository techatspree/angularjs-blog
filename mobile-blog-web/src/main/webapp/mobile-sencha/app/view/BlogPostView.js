/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.BlogPostView", {
    extend: "Ext.Panel",
    xtype: 'blogpostview',


    show: function() {
        this.callParent(arguments);
//        console.log(this.getRecord());

        console.log("blog post show");
        this.title = this.getRecord().data.title;


    },

//
//    title: record.data.title,
//    scrollable: true,
//    layout: 'vbox',
//    items: [
//        {
//            xtype: 'panel',
//            width: '100%',
//            height: 'auto',
//            html: template.apply(record.data),
//            styleHtmlContent: true
//        },
//        {
//            xtype: 'dataview',
//            scrollable: false,
//            width: '100%',
//            height: 'auto',
//            store: 'comments',
////                                store: {
////                                    fields: ['name', 'age'],
////                                    data: [
////                                        {name: 'Jamie',  age: 100},
////                                        {name: 'Rob',   age: 21},
////                                        {name: 'Tommy', age: 24},
////                                        {name: 'Jacky', age: 24},
////                                        {name: 'Ed',   age: 26}
////                                    ]
////                                },
//
//
//
////                                html: commentsTpl.apply(data),
//            itemTpl: commentsTpl,
//            styleHtmlContent: true
//        }
//    ]

    config: {
        layout: 'vbox',
        itemTpl: '{content}',

        items: [
            {
                xtype: 'toolbar',
                title: 'title',

                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back'
                    }
                ]
            },
            {
                html: "{content}",
                height: "auto"
            },
            {
                html: "commtens",
                height: 'auto'
            }
        ]
    },


    title: ""


});