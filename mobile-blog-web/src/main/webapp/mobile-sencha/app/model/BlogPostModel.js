/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define('Blog.model.BlogPostModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'content', type: 'string' },
            { name: 'author' },
            { name: 'created', type: 'date', dateFormat: 'time'}
        ]
    }
});