App.BlogEntryService = function() {
    var changeEventName = "BlogEntryService:change";
    $.Event(changeEventName);

    return {
        addBlogPost : function(blogPost, callback, errorCallback) {
            blogPost.author = {};
            blogPost.author.id = App.UserService.getUser().id;

            $.ajax({
                url: "../rest/blog",
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                data: JSON.stringify(blogPost),
                cache: false,
                success: function(data) {
                    $(document).trigger(changeEventName);
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error adding blog post -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        },

        addComment : function(postId, comment, callback, errorCallback) {
            comment.author = {};
            comment.author.id = App.UserService.getUser().id;

            $.ajax({
                url: "../rest/blog/" + postId + "/comment",
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                data: JSON.stringify(comment),
                cache: false,
                success: function(data) {
                    $(document).trigger(changeEventName);
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error adding comment -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        },

        retrieveBlogPosts : function(callback, errorCallback) {
            $.ajax({
                url: "../rest/blog",
                cache: false,
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error retrieving blog posts -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        },

        retrieveBlogPost : function(postId, callback, errorCallback) {
            $.ajax({
                url: "../rest/blog/" + postId,
                cache: false,
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error retrieving blog post -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        },

        retrieveComments : function(postId, callback, errorCallback) {
            $.ajax({
                url: "../rest/blog/" + postId + "/comment",
                cache: false,
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    var errorMsg = "error retrieving comment -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        }
    }
}();
