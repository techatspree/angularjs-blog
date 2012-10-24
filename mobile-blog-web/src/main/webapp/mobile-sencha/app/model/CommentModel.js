/**
 * @author Till Hermsen
 * @date 17.10.12
 */
Ext.define('Blog.model.CommentModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'author' },
            { name: 'content', type: 'string' },
            { name: 'created', type: 'date', dateFormat: 'time'}
        ]
    }
});