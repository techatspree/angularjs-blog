App.BlogPostNode = function() {

    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function(postId) {

            if ($('#blogEntryContainer').length > 0) {
                hub.getComponent("blogPostFrontend").updateWithBlogPost(postId);
            }
            if ($('#commentList').length > 0) {
                hub.getComponent("blogPostFrontend").updateWithComments(postId);
            }

            if (App.UserService.isLoggedIn()) {
                var addCommentForm = $("#addCommentFormContainer");

                if (addCommentForm) {
                    addCommentForm.remove();
                }

                $("#commentList").after(_.template($("#desktopcommentform-tmpl").html(), {}));
                $("#submitComment").on("click", function(e) {
                    App.BlogAddComment.onSubmitClicked(postId);
                    return false;
                });
            }
        },

        get : function() {
            return $("#desktopblogentry-tmpl").html();
        }
    }
}();
