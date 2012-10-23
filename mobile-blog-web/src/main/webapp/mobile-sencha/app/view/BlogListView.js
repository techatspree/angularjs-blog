/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.BlogListView", {

    extend: "Ext.Panel",
    id: 'blogListView',

    requires: [
        'Ext.dataview.List'
    ],

    config: {
        title: "",
        fullscreen: true,
        layout: 'vbox'
    },

    initialize: function() {
        this.callParent(arguments);
        var blogList = Ext.create('Ext.List', {
                id: 'blogList',
                itemTpl: Ext.XTemplate.from(Ext.get('blogpostlist')),
                disableSelection: true,
                onItemDisclosure: true,
                flex: 1
        });

        this.add(blogList);
    }

});
