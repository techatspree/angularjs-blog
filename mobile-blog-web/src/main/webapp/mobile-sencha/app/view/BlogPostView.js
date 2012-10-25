/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.BlogPostView", {
    extend: "Ext.Panel",
    id: 'blogPostView',

    config: {
        title: "",
        layout: 'fit'
    },

    initialize: function() {
        this.callParent(arguments);

        var blogPostPanel = Ext.create("Ext.Panel", {
            layout: 'vbox',
            scrollable: true
        });

        var post = Ext.create("Ext.dataview.DataView", {
            width: '100%',
            height: 'auto',
            scrollable: false,
            id: 'post',
            store: 'blogPostStore',
            itemTpl: Ext.XTemplate.from(Ext.get('blogpost')),
            styleHtmlContent: true
        });

        var commentsHeader = Ext.create("Ext.Panel", {
            width: '100%',
            height: 'auto',
            html: '<h5>Comments</h5>',
            styleHtmlContent: true
        });

        var commentsList = Ext.create("Ext.dataview.DataView", {
            width: '100%',
            height: 'auto',
            scrollable: false,
            store: 'commentsStore',
            itemTpl: Ext.XTemplate.from(Ext.get('comment')),
            styleHtmlContent: true
        });

        blogPostPanel.add(post);
        blogPostPanel.add(commentsHeader);
        blogPostPanel.add(commentsList);

        this.add(blogPostPanel);
    }

});
