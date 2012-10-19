/**
 * @author Till Hermsen
 * @date 17.10.12
 */
Ext.define('Blog.model.Post', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'title', 'content', "author"],

        proxy: {
            type: 'rest',
            url: '../rest/blog'
        }


    }
});