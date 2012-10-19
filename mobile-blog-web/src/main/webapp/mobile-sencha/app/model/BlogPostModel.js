/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define('Blog.model.BlogPostModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'title', 'content', "author"],
//        proxy: {
//            type: 'rest',
//            url: '../rest/blog'
//        }
    }
});