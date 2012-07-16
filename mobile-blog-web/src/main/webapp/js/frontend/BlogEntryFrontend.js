App.BlogEntryFrontend = function() {
    var appendTemplateDataToNode = function(node, data, templateId) {
        var templateFunc = _.template($(templateId).html());
        node.append(templateFunc({"data": data}));
    }

    return {
        updateWithBlogList : function(node) {
            App.BlogEntryService.retrieveBlogEntries(
                function(result) {
                    $(node).empty();
                    $.each(result, function(index, blogPost) {
                        if (blogPost.content.length > 300) {
                            blogPost.content = $.trim(blogPost.content).substring(0, 300)
                                    .split(" ").slice(0, -1).join(" ") + "...";
                        }
                        blogPost.content.replace(/\n/g, '<br />');
                        blogPost.created = new Date(blogPost.created).toUTCString();

                        appendTemplateDataToNode(node, blogPost, "#bloglistentry-tmpl");
                        var postButtons = $("#postButton" + blogPost.id);
                        if (postButtons.length > 0) {
                            postButtons.onpress(function() {
                                App.openBlogPost(blogPost.id);
                                return false;
                            });
                        }
                    });
                },
                function(error) {
                    // TODO: error handling
                }
            );
        },

        updateWithBlogPost : function(node, id) {
            App.BlogEntryService.retrieveBlogEntry(id,
                function(blogPost) {
                    $(node).empty();
                    blogPost.content.replace(/\n/g, '<br />');
                    blogPost.created = new Date(blogPost.created).toUTCString();

                    appendTemplateDataToNode(node, blogPost, "#blogentry-tmpl");
                },
                function(error){
                    // TODO: error handling
                });
        },

        updateWithComments : function(node, id) {
            App.BlogEntryService.retrieveComments(id,
                function(result){
                    $(node).empty();
                    $.each(result, function(index, comment) {
                        comment.content.replace(/\n/g, '<br />');
                        appendTemplateDataToNode(node, comment, "#comment-tmpl");
                    });
                },
                function(error) {
                    // TODO: error handling
                });
        },
    }
}();
