App.BlogEntryFrontend = function() {
    /* Builds the updated table for the member list */
    var appendBlogEntryRows = function(root, blogEntries) {
         _.each(blogEntries, function(blogEntry) {
            var template = _.template($("#bloglistentry-tmpl" ).html());
            root.append(template({"blogEntry": blogEntry.blogEntry}));
        });

        for(var i=0; i < blogEntries.length; i++) {
            $("#postButton" + i).onpress(function() {
                App.openBlogPost(i);
                return false;
            });
        }
    }

    return {
        updateBlogTable : function(rootNode) {
            // TODO: Error handling
            App.BlogEntryService.retrieveBlogEntries(function(result){
                $(rootNode).empty();
                appendBlogEntryRows(rootNode, result);
            });
        }
    }
}();
