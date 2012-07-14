App.BlogEntryService = function() {
    return {
        addBlogEntry : function(blogEntry) {
            // TODO: all posts (e.g. add user, add post) are alike. use one function to do it?
            $.ajax({
                url: "../rest/blog",
                type: "POST",
                cache: false,
                data: blogEntry,
                success: function(data) {
                    callback(data);
                },
                error: function(error) {
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error adding blog post -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
        },

        retrieveBlogEntries : function(callback, errorCallback) {
            $.ajax({
                // TODO: Replace with REST call
//                url: "../mockData/blogEntries.json",
                url: "../rest/blog",
                cache: false,
                success: function(data) {
                    // TODO: Remove next line when JSON media type is given by server
//                    data = JSON.parse(data);
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

        retrieveBlogEntry : function(id, callback, errorCallback) {
            $.ajax({
                // TODO: Replace with REST call
                url: "../rest/blog/" + id,
                cache: false,
                success: function(data) {
                    // TODO: Remove next line when JSON media type is given by server
//                    data = JSON.parse(data);
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
        }
    }
}();
