/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.store.CommentsStore", {

    extend: 'Ext.data.Store',
    config: {
        storeId: 'comments',
        model: 'Blog.model.CommentModel',
        proxy: {
            type: 'rest',
            url: '../rest/blog/{id}/comment'
        },
        listeners: {
            refresh: function() {
                console.log("comments store refresh");
                console.log(this.getData());
            }
        }
    }

});