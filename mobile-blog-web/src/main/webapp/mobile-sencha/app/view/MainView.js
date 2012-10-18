/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.view.MainView", {

    extend: "Ext.navigation.View",
    xtype: 'mainview',
    fullscreen: true,

    config: {
        items: [
            {
                xtype: 'list',
                title: 'Mobile Blog',
                itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{content}</div>',
                store: 'BlogPostsStore',
                onItemDisclosure: function (record, btn, index) {
                    console.log("disclosure");
                    this.fireEvent("showBlogPost", this, record);

//                    this.push({
//                        xtype: 'panel',
//                        title: 'Activity',
////                        html: template.apply(record.data),
//                        styleHtmlContent: true
//                    });
                }
            }
        ],
        listeners: {
        }
    }

});