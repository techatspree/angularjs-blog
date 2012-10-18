Ext.define("Blog.view.Main", {
    extend: "Ext.Container",
    xtype: "maincontainer",

    initialize: function() {

        this.callParent(arguments);

        var blogList = {
                xtype: "bloglistview"
        };


        this.add(blogList);


        var blogPostView = {
            xtype: "blogpostview"
        };
        this.add(blogPostView);

//        this.add(view);






//        this.setActiveItem(blogList);
    },

    config: {
        layout: {
            type: 'card'
        }
    }

});