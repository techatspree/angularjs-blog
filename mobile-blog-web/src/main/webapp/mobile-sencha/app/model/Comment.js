/**
 * @author Till Hermsen
 * @date 17.10.12
 */
Ext.define('Blog.model.Comment', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id', 'author', 'content', 'created'
        ],
//        proxy: {
//            type: 'rest',
//            url: '../rest/blog/{id}/comments'
//        }
    },

});