/**
 * Author: Till Hermsen
 * Date: 08.10.12
 */
blogPostBackendContract = {

    /**
     * Adds new blog post.
     *
     * @param blogPost post data
     * @param callback function to call on success
     * @param errorCallback function to call on error
     */
    addBlogPost : function(blogPost, callback, errorCallback) {},

    /**
     * Adds new comment.
     *
     * @param postId
     * @param comment comment data
     * @param callback function to call on success
     * @param errorCallback function to call on error
     */
    addComment : function(postId, comment, callback, errorCallback) {},

    /**
     * Retrieves all blog posts.
     *
     * @param callback function to call on success
     * @param errorCallback function to call on error
     */
    retrieveBlogPosts : function(callback, errorCallback) {},

    /**
     * Retrieves blog post with the given postId.
     *
     * @param postId
     * @param callback function to call on success
     * @param errorCallback function to call on error
     */
    retrieveBlogPost : function(postId, callback, errorCallback) {},

    /**
     * Retrieves all comments for the given postId.
     *
     * @param postId
     * @param callback function to call on success
     * @param errorCallback function to call on error
     */
    retrieveComments : function(postId, callback, errorCallback) {}

}


blogPostBackend = {

    hub: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogPostBackend';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: blogPostBackendContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {},

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function() {},


    /**
     * Contract methods.
     */
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
//                $(document).trigger(this.changeEventName);
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