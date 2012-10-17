Ext.define("GS.view.Main", {
    extend: "Ext.Container",


    config: {
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Blog"
            },
            {
                title: "bla",
                xtype: 'bloglist',
            }
        ]
    }
});