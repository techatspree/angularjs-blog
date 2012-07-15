App.BlogEntryFrontend = function() {
    /* Builds the updated table for the member list */
    var appendBlogPosts = function(root, blogEntries) {
         _.each(blogEntries, function(blogEntry) {
            var template = _.template($("#bloglistentry-tmpl" ).html());
            root.append(template({"blogEntry": blogEntry}));

            $("#postButton" + blogEntry.id).onpress(function() {
                App.openBlogPost(blogEntry.id);
                return false;
            });

        });
    }

    var appendBlogPost = function(root, blogEntry) {
        var template = _.template( $( "#blogentry-tmpl" ).html());
        root.append(template({"blogEntry": blogEntry}));
    };

    var appendComments = function(root, comments) {
        _.each(comments, function(comment) {
            var template = _.template( $( "#comment-tmpl" ).html());
            root.append(template({"comment": comment}));
        });
    };

    return {
        updateWithBlogList : function(rootNode) {
            // TODO: Error handling
            App.BlogEntryService.retrieveBlogEntries(function(result){
                $(rootNode).empty();
                appendBlogPosts(rootNode, result);
            });
        },

        updateWithBlogPost : function(rootNode, id) {
            // TODO: Error handling
            App.BlogEntryService.retrieveBlogEntry(id, function(result){
                $(rootNode).empty();
                appendBlogPost(rootNode, result);
            });
        },

        updateWithComments : function(rootNode) {
            // TODO: Error handling
            App.BlogEntryService.retrieveComments(App.currentBlogPostId, function(result){
                $(rootNode).empty();
                appendComments(rootNode, result);
            });
        },
    }
}();
