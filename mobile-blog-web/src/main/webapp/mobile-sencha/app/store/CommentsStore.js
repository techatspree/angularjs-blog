/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.store.CommentsStore", {

    extend: 'Ext.data.Store',
    config: {
        storeId: 'commentsStore',
        model: 'Blog.model.CommentModel',
        proxy: {
            type: 'ajax',
            url: '../rest/blog/{id}/comment'
        },

//        data: [
//            {
//                "content":"Lorem ipsum dolor sit tempor invi"
//            },
//
//            {
//                "content":"Loeirmod temp eota kactus est Lorem ipsum dolor sit amet",
//            }
//        ]

    }

});