/**
 * @author Till Hermsen
 * @date 22.10.12
 */
Ext.define("Blog.controller.BlogPostController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: '#mainView',
            blogList: '#blogList',
            blogListView: '#blogListView',
            blogPostView: '#blogPostView',
            postPanel: '#postPanel',
            backBtn: '#blogPostBackBtn',
        },
        control: {
            blogList: {
                showBlogPost: 'showBlogPost'
            }

        }
    },

    showBlogPost: function(list, index, target, record, e, eOpts) {
        // blog post view
        var view = (this.getBlogPostView()) ? this.getBlogPostView(): Ext.create("Blog.view.BlogPostView");

        view.setRecord(record);

        // set post data
        var postTpl = Ext.XTemplate.from(Ext.get('blogpost'));
        this.getPostPanel().setHtml(postTpl.apply(record.data));

        var mainView = this.getMainView();
        mainView.push(view);
        // load comments
        // set store url
        // load store
    }

});
