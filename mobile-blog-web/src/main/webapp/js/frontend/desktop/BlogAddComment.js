/**
 * User: Till Hermsen
 * Date: 02.10.12
 */
App.BlogAddComment = function() {

    return {

        onSubmitClicked : function(postId) {
            console.log("comment submit clicked");

            var commentFormData = $("#addCommentForm").serializeArray();

            var comment = {};
            comment.content = commentFormData[0].value;

            hub.getComponent("blogPostBackend").addComment(postId, comment, function() {
                App.BlogPostNode.refresh(postId);
            });

        }
    }

}();