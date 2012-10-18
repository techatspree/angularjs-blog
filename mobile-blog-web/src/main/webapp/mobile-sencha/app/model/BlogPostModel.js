/**
 * @author Till Hermsen
 * @date 17.10.12
 */
Ext.define('Blog.model.BlogPostModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['title', 'content', 'id']
    }
});