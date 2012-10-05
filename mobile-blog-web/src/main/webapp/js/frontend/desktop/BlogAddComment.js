/**
 * User: Till Hermsen
 * Date: 02.10.12
 */
App.BlogAddComment = function() {

    return {

        onSubmitClicked : function(blogPostId) {
            console.log("comment submit clicked");

            var commentFormData = $("#addCommentForm").serializeArray();

            var comment = {};
            comment.content = commentFormData[0].value;

            App.BlogEntryService.addComment(blogPostId, comment, function() {
                App.BlogPostNode.refresh(blogPostId);
            });

        }
    }

}();