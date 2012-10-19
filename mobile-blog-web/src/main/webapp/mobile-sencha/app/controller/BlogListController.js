/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.controller.BlogListController", {
    extend: "Ext.app.Controller",

    config: {
        refs: {
            blogList: "#blogList",
            addPostBtn: "#addPostBtn",
            loginBtn: "#loginBtn",
            mainContainer: 'maincontainer',
            blogPostView: 'blogpostview'
        },
        control: {
            blogList: {
                itemtap: "onItemTap"
            },
            addPostBtn: {
                initialize: function(btn, e, eOpts) {
                    var userService = this.getApplication().getController('UserServiceController');

                    if (!userService.isLoggedIn()) {
                        btn.hide();
                    }
                }
            },
            loginBtn: {
                initialize: function(btn, e, eOpts) {
                    var userService = this.getApplication().getController('UserServiceController');
                    if (userService.isLoggedIn()) {
                        btn.hide();
                    }
                },
                tap: function(btn, e, eOpts) {
                    console.log("login btn tapped");
                }
            }
        }
    },


    onItemTap: function(list, index, target, record, e, eOpts) {



        console.log("item tapped");

        var view = this.getBlogPostView();

        view.setRecord(record);
        var subItems = view.getItems();

//        console.log(subItems);
//        subItems[0].setTitle("YEAH");




        this.getMainContainer().animateActiveItem(view, {
            type: "slide",
            direction: "left"
        });
    },

});