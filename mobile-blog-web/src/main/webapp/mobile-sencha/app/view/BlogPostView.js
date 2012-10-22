/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.BlogPostView", {
    extend: "Ext.Panel",
    id: 'blogPostView',

    config: {
        title: "",
        layout: 'vbox'
    },

    initialize: function() {
        this.callParent(arguments);

        var blogPostPanel = Ext.create("Ext.Panel", {
            layout: 'vbox',
            flex: 1,
            scrollable: true
        });

        var postPanel = Ext.create("Ext.Panel", {
            width: '100%',
            height: 'auto',
            id: 'postPanel',
            scrollable: false,
            styleHtmlContent: true
        });

        var commentsList = Ext.create("Ext.dataview.DataView", {
            width: '100%',
            height: 'auto',
            scrollable: false,
//            store: 'comments',
            store: {
                fields: ['content'],
                    data: [
                        {content: 'Jamie',  age: 100},
                        {content: 'Rob',   age: 21},
                        {content: 'Tommy', age: 24},
                        {content: 'Jacky', age: 24},
                        {content: 'Ed',   age: 26}
                    ]
                },
                itemTpl: Ext.XTemplate.from(Ext.get('comment')),
                styleHtmlContent: true
        });

        blogPostPanel.add(postPanel);
        blogPostPanel.add(commentsList);

        this.add(blogPostPanel);

    },

    show: function() {
        this.callParent(arguments);

        var title = this.getRecord().data.title;

        this.setTitle(title);
    }

});
