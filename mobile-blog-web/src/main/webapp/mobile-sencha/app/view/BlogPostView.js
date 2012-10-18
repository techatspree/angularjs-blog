/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.view.BlogPostView", {

    extend: "Ext.Container",
    xtype: "blogpostview",

    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Blog Post Title",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "back",
                        itemId: "backBtn"
                    }
                ]
            }

        ],
        listeners: [
            {
                delegate: "#backBtn",
                event: "tap",
                fn: "onBackBtnTap"
            }
        ]
    },

    onBackBtnTap: function () {
        console.log("back");
        this.fireEvent("back", this);
    }


});
