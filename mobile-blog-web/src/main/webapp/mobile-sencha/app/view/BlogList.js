Ext.define("GS.view.BlogList", {
    extend: "Ext.dataview.List",
    xtype: "bloglist",
    config: {
            itemTpl: "<h1>{title}</h1><div><a href='#'>Read more</a></div>",
//        store: "BlogPosts",
        data: [
            {title: "item 1"}
        ],
        styleHtmlContent: true
    }

//    xtype: 'bloglist',
//    extend: 'Ext.dataview.DataView',
//
//
//    config: {
//        itemTpl: "<h1>{title}</h1><div>{content}<a href='#'>Read more</a></div>",
//        cls: 'blogPost',
//        store: "BlogPosts",
//        styleHtmlContent: true
//    }
});