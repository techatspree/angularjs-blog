/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.controller.MainController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            mainView: 'mainview',
            blogList: 'list'
        },
        control: {

            blogList: {
                showBlogPost: function(list, record) {
                    console.log(record);

                    var template = Ext.XTemplate.from(Ext.get('blogpost'));

                    this.getMainView().push({
                        xtype: 'panel',
                        scrollable: true,
                        title: record.data.title,
                        html: template.apply(record.data),
                        styleHtmlContent: true
                    });
                }
            }

        }
    },

});