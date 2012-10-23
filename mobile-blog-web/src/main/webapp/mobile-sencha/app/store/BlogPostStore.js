/**
 * @author Till Hermsen
 * @date 23.10.12
 */
Ext.define("Blog.store.BlogPostStore", {

    extend: "Ext.data.Store",
    config: {
        storeId: 'blogPostStore',
        model: 'Blog.model.BlogPostModel'
    }

});