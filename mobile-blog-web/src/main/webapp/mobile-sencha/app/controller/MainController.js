/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.controller.MainController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            blogListView: "bloglistview",
            blogList: "bloglist",
            blogPostView: "blogpostview",
            mainContainer: "maincontainer"
        },
        control: {
            blogListView: {
                showBlogPost: "onShowBlogPostEvent"
            },
            blogPostView: {
                back: "onBackBtnEvent"
            }
        }
    },

    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    onShowBlogPostEvent: function(list, record) {
        console.log("on show blog post event");

        var view = this.getBlogPostView();
//        Ext.Viewport.animateActiveItem(view, this.slideLeftTransition);

        view.setRecord(record);

        var main = this.getMainContainer();

        console.log(main);

        main.animateActiveItem(view, this.slideLeftTransition);

    },

    onBackBtnEvent: function() {
        var main = this.getMainContainer();
        main.animateActiveItem(this.getBlogListView(), this.slideRightTransition);
    }

});