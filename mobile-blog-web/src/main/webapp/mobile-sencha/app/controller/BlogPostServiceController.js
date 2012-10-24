/**
 * @author Till Hermsen
 * @date 24.10.12
 */
Ext.define("Blog.controller.BlogPostServiceController", {

    extend: 'Ext.app.Controller',

    config: {
        refs: {},
        control: {}
    },

    addBlogPost: function(blogPost, callback, errorCallback) {
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.request({
            url: "../rest/blog",
            method: "POST",
            params: JSON.stringify(blogPost),
            headers: { 'Content-Type' : 'application/json' },
            success: function(response) {
                callback();
            },
            failure: function(response) {
                errorCallback();
            }
        });
    },

    addComment: function(blodPostId, comment, callback, errorCallback) {
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.request({
            url: "../rest/blog/" + blogPostId + "/comment",
            method: "POST",
            params: JSON.stringify(comment),
            headers: { 'Content-Type' : 'application/json' },
            success: function(response) {
                callback();
            },
            failure: function(response) {
                errorCallback();
            }
        });
    }

});