/**
 * @author Till Hermsen
 * @date 17.10.12
 */
Ext.define('Blog.model.CommentModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id', 'author', 'content', 'created'
        ]
    }
});