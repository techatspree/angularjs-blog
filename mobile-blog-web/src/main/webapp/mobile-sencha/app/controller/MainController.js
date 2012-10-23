/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.controller.MainController", {

    extend: "Ext.app.Controller",
    requires: [
        'Blog.view.MainView'
    ],

    config: {
        refs: {
        },
        control: {
            "container[id='mainContainer']": {
                initialize: 'initMainContainer'
            }
        }
    },

    initMainContainer: function(self, eOpts) {
        // main view and blog list view
        var mainView = Ext.create('Blog.view.MainView'),
            blogListView = Ext.create('Blog.view.BlogListView');

        mainView.add(blogListView);
        self.add([mainView]);
    }

});
