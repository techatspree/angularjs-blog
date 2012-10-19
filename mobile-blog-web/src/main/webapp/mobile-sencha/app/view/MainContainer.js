/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.MainContainer", {
    extend: "Ext.Container",
    xtype: 'maincontainer',

    config: {
        fullscreen: true,
        layout: 'card',
        items: [
            {
                xtype: 'bloglistview'
            },
            {
                xtype: 'blogpostview'
            }
        ]
    }
});